/* @vitest-environment jsdom */
/* @vitest-environment jsdom */
import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App.jsx';

vi.mock('../services/api', () => {
  const featuredMeals = {
    meals: [
      { idMeal: '1', strMeal: 'Chicken Handi', strMealThumb: 'thumb1.jpg', strCategory: 'Chicken', strArea: 'Indian' },
      { idMeal: '2', strMeal: 'Chicken Alfredo', strMealThumb: 'thumb2.jpg', strCategory: 'Pasta', strArea: 'Italian' },
    ],
  };

  const categories = { meals: [ { strCategory: 'Beef' }, { strCategory: 'Seafood' } ] };
  const areas = { meals: [ { strArea: 'American' }, { strArea: 'Canadian' } ] };

  const filtered = {
    meals: [
      { idMeal: '10', strMeal: 'Grilled Salmon', strMealThumb: 'thumb3.jpg', strCategory: 'Seafood', strArea: 'American' },
      { idMeal: '11', strMeal: 'Shrimp Scampi', strMealThumb: 'thumb4.jpg', strCategory: 'Seafood', strArea: 'Italian' },
    ],
  };

  return {
    mealAPI: {
      searchByName: vi.fn().mockResolvedValue(featuredMeals),
      listCategories: vi.fn().mockResolvedValue(categories),
      listAreas: vi.fn().mockResolvedValue(areas),
      filterByCategory: vi.fn().mockResolvedValue(filtered),
      filterByArea: vi.fn(),
      getRandomMeal: vi.fn(),
      getMealById: vi.fn(),
    }
  };
});

describe('App - Category filter flow', () => {
  it('filters by category and updates header and results', async () => {
    render(<App />);

    // Wait for initial featured meals to load
    await waitFor(() => {
      expect(screen.getByText(/Featured Recipes|Search Results|Filtered by/i)).toBeInTheDocument();
    });

    const categorySelect = await screen.findByRole('combobox', { name: /Category/i });
    await userEvent.selectOptions(categorySelect, 'Seafood');

    // Ensure filterByCategory was called correctly
    const { mealAPI } = await import('../services/api');
    expect(mealAPI.filterByCategory).toHaveBeenCalledWith('Seafood');

    // Header updates
    await waitFor(() => {
      expect(screen.getByText('Filtered by Category')).toBeInTheDocument();
    });

    // Count matches filtered meals
    const cards = await screen.findAllByRole('img', { name: /grilled salmon|shrimp scampi/i });
    expect(cards.length).toBe(2);
  });
});
