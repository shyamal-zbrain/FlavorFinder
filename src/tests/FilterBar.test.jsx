/* @vitest-environment jsdom */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FilterBar from '../components/FilterBar.jsx';

vi.mock('../services/api', () => ({
  mealAPI: {
    listCategories: vi.fn().mockResolvedValue({ meals: [
      { strCategory: 'Beef' },
      { strCategory: 'Seafood' },
    ]}),
    listAreas: vi.fn().mockResolvedValue({ meals: [
      { strArea: 'American' },
      { strArea: 'Canadian' },
    ]}),
  }
}));

describe('FilterBar', () => {
  it('dispatches category filter when a category is selected', async () => {
    const onFilter = vi.fn();
    const onRandomMeal = vi.fn();

    render(<FilterBar onFilter={onFilter} onRandomMeal={onRandomMeal} />);

    // wait for categories to load
    const select = await screen.findByRole('combobox', { name: /Category/i });
    await userEvent.selectOptions(select, 'Seafood');

    await waitFor(() => {
      expect(onFilter).toHaveBeenCalledWith('category', 'Seafood');
    });
  });
});
