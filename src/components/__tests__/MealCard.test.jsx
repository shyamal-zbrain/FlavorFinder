import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import MealCard from '../MealCard';

describe('MealCard', () => {
  const baseMeal = {
    idMeal: '1',
    strMeal: 'Chicken Curry',
    strMealThumb: 'http://example.com/img.jpg',
    strCategory: 'Chicken',
    strArea: 'Indian'
  };

  it('renders meal title as an h3 heading and image alt', () => {
    render(<MealCard meal={baseMeal} onClick={() => {}} />);
    const heading = screen.getByRole('heading', { level: 3, name: /chicken curry/i });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveClass('meal-title');
    expect(screen.getByRole('img', { name: /chicken curry/i })).toBeInTheDocument();
  });

  it('falls back to "Untitled Recipe" when strMeal is missing/blank', () => {
    render(<MealCard meal={{ ...baseMeal, strMeal: '' }} onClick={() => {}} />);
    expect(screen.getByRole('heading', { level: 3, name: /untitled recipe/i })).toBeInTheDocument();
  });
});
