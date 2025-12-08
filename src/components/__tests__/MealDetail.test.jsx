import React from 'react';
import { render, screen } from '@testing-library/react';
import MealDetail from '../MealDetail';
import { describe, it, expect, vi } from 'vitest';

const mockMeal = {
  idMeal: '12345',
  strMeal: 'Mock Meal',
  strMealThumb: 'https://www.themealdb.com/images/media/meals/mock.jpg',
  strInstructions: 'Step 1. Do this.\nStep 2. Do that.',
  strCategory: 'Test',
  strArea: 'Testland'
};

vi.mock('../../services/api', () => ({
  mealAPI: {
    getMealById: vi.fn(async () => ({ meals: [mockMeal] })),
    getMealThumbnail: (url, size = 'preview') => (size === 'preview' ? `${url}/preview` : url)
  }
}));

describe('MealDetail modal', () => {
  it('renders meal image with correct src and alt', async () => {
    render(<MealDetail mealId="12345" onClose={() => {}} />);
    const img = await screen.findByAltText('Mock Meal');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://www.themealdb.com/images/media/meals/mock.jpg');
  });
});
