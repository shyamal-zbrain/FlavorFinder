import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App.jsx';

vi.mock('../services/api', () => {
  const makeMeal = (id, name) => ({ idMeal: id, strMeal: name, strMealThumb: `https://img/${id}.jpg` });
  const details = {
    '1': { meals: [{ idMeal: '1', strMeal: 'Meal One', strMealThumb: 'https://img/1.jpg', strInstructions: 'Step 1' }] },
    '2': { meals: [{ idMeal: '2', strMeal: 'Meal Two', strMealThumb: 'https://img/2.jpg', strInstructions: 'Step 1' }] },
    '3': { meals: [{ idMeal: '3', strMeal: 'Meal Three', strMealThumb: 'https://img/3.jpg', strInstructions: 'Step 1' }] },
    '9': { meals: [{ idMeal: '9', strMeal: 'Meal Nine', strMealThumb: 'https://img/9.jpg', strInstructions: 'Step 1' }] },
    '10': { meals: [{ idMeal: '10', strMeal: 'Meal Ten', strMealThumb: 'https://img/10.jpg', strInstructions: 'Step 1' }] }
  };
  return {
    mealAPI: {
      searchByName: vi.fn().mockResolvedValue({ meals: [makeMeal('1','Meal One'), makeMeal('2','Meal Two'), makeMeal('3','Meal Three')] }),
      getRandomMeal: vi.fn(),
      getMealById: vi.fn((id) => Promise.resolve(details[id] || { meals: [] })),
      listCategories: vi.fn().mockResolvedValue({ meals: [] }),
      listAreas: vi.fn().mockResolvedValue({ meals: [] }),
      filterByCategory: vi.fn().mockResolvedValue({ meals: [] }),
      filterByArea: vi.fn().mockResolvedValue({ meals: [] }),
    }
  };
});

const closeModal = async () => {
  const overlay = document.querySelector('.modal-overlay');
  if (overlay) overlay.click();
  await waitFor(() => expect(document.querySelector('.modal-overlay')).toBeNull());
};

describe('Surprise Me integration', () => {
  it('Scenario A: grid has meals, modal opens and repeats avoided', async () => {
    render(<App />);
    // Wait for grid
    await screen.findByText(/recipes found/i);

    // Click Surprise Me
    const btn = screen.getByRole('button', { name: /surprise me/i });
    await userEvent.click(btn);

    // Modal shows
    const modalTitle = await screen.findByRole('heading', { level: 2 });
    const firstTitle = modalTitle.textContent;

    await closeModal();

    await userEvent.click(btn);
    const modalTitle2 = await screen.findByRole('heading', { level: 2 });
    const secondTitle = modalTitle2.textContent;

    expect(secondTitle).not.toBe(firstTitle);
  });

  it('Scenario B: grid empty, uses API random with retry to avoid same id twice', async () => {
    const { mealAPI } = await import('../services/api');
    mealAPI.searchByName.mockResolvedValueOnce({ meals: [] });
    // first random returns id '9', second '9' then '10' to simulate retry
    mealAPI.getRandomMeal
      .mockResolvedValueOnce({ meals: [{ idMeal: '9' }] })
      .mockResolvedValueOnce({ meals: [{ idMeal: '9' }] })
      .mockResolvedValueOnce({ meals: [{ idMeal: '10' }] });

    render(<App />);

    await screen.findByText(/no recipes found/i);
    const btn = screen.getByRole('button', { name: /surprise me/i });

    await userEvent.click(btn);
    const title1 = await screen.findByRole('heading', { level: 2 });
    const first = title1.textContent;

    await closeModal();

    await userEvent.click(btn);
    const title2 = await screen.findByRole('heading', { level: 2 });
    const second = title2.textContent;

    expect(second).not.toBe(first);
  });
});
