const BASE_URL = 'https://www.themealdb.com/api/json/v2/1';

export const mealAPI = {
  // Search meal by name
  searchByName: async (name) => {
    const response = await fetch(`${BASE_URL}/search.php?s=${name}`);
    return response.json();
  },

  // List all meals by first letter
  searchByLetter: async (letter) => {
    const response = await fetch(`${BASE_URL}/search.php?f=${letter}`);
    return response.json();
  },

  // Lookup full meal details by id
  getMealById: async (id) => {
    const response = await fetch(`${BASE_URL}/lookup.php?i=${id}`);
    return response.json();
  },

  // Lookup a single random meal
  getRandomMeal: async () => {
    const response = await fetch(`${BASE_URL}/random.php`);
    return response.json();
  },

  // List all meal categories
  getCategories: async () => {
    const response = await fetch(`${BASE_URL}/categories.php`);
    return response.json();
  },

  // List all categories (simplified)
  listCategories: async () => {
    const response = await fetch(`${BASE_URL}/list.php?c=list`);
    return response.json();
  },

  // List all areas
  listAreas: async () => {
    const response = await fetch(`${BASE_URL}/list.php?a=list`);
    return response.json();
  },

  // List all ingredients
  listIngredients: async () => {
    const response = await fetch(`${BASE_URL}/list.php?i=list`);
    return response.json();
  },

  // Filter by main ingredient
  filterByIngredient: async (ingredient) => {
    const response = await fetch(`${BASE_URL}/filter.php?i=${ingredient}`);
    return response.json();
  },

  // Filter by category
  filterByCategory: async (category) => {
    const response = await fetch(`${BASE_URL}/filter.php?c=${category}`);
    return response.json();
  },

  // Filter by area
  filterByArea: async (area) => {
    const response = await fetch(`${BASE_URL}/filter.php?a=${area}`);
    return response.json();
  },

  // Helper to get ingredient image URL
  getIngredientImage: (ingredient, size = 'medium') => {
    const formattedIngredient = ingredient.replace(/ /g, '_');
    return `https://www.themealdb.com/images/ingredients/${formattedIngredient}-${size}.png`;
  },

  // Helper to get meal thumbnail
  getMealThumbnail: (url, size = 'preview') => {
    if (!url) return '';
    return size === 'preview' ? `${url}/preview` : url;
  }
};
