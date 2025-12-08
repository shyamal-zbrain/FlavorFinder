import React, { useState, useEffect } from 'react';
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import FilterBar from './components/FilterBar';
import MealCard from './components/MealCard';
import MealDetail from './components/MealDetail';
import { mealAPI } from './services/api';
import './App.css';

function App() {
  const [meals, setMeals] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMealId, setSelectedMealId] = useState(null);
  const [currentView, setCurrentView] = useState('featured');

  useEffect(() => {
    loadFeaturedMeals();
  }, []);

  const loadFeaturedMeals = async () => {
    try {
      setLoading(true);
      // Load some featured meals (using a popular search term)
      const data = await mealAPI.searchByName('chicken');
      setMeals(data.meals || []);
      setCurrentView('featured');
    } catch (error) {
      console.error('Error loading meals:', error);
      setMeals([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query) => {
    try {
      setLoading(true);
      const data = await mealAPI.searchByName(query);
      setMeals(data.meals || []);
      setCurrentView('search');
    } catch (error) {
      console.error('Error searching meals:', error);
      setMeals([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = async (filterType, value) => {
    try {
      setLoading(true);
      let data;

      if (filterType === 'category') {
        data = await mealAPI.filterByCategory(value);
      } else if (filterType === 'area') {
        data = await mealAPI.filterByArea(value);
      } else {
        // Reset to featured
        data = await mealAPI.searchByName('chicken');
      }

      setMeals(data.meals || []);
      setCurrentView(filterType);
    } catch (error) {
      console.error('Error filtering meals:', error);
      setMeals([]);
    } finally {
      setLoading(false);
    }
  };

  const handleRandomMeal = async () => {
    try {
      setLoading(true);
      const data = await mealAPI.getRandomMeal();
      if (data.meals && data.meals.length > 0) {
        console.log("Random meal found:", data.meals[0].strMeal);
      }
    } catch (error) {
      console.error('Error loading random meal:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMealClick = (meal) => {
    setSelectedMealId(meal.idMeal);
  };

  const handleCloseModal = () => {
    setSelectedMealId(null);
  };

  return (
    <div className="app">
      <Header
        onSearch={handleSearch}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <FilterBar
        onFilter={handleFilter}
        onRandomMeal={handleRandomMeal}
      />

      <main className="main-content">
        <div className="container">
          {loading ? (
            <div className="loading-grid">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="skeleton-card">
                  <div className="skeleton skeleton-image"></div>
                  <div className="skeleton-content">
                    <div className="skeleton skeleton-title"></div>
                    <div className="skeleton skeleton-text"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : meals && meals.length > 0 ? (
            <>
              <div className="results-header">
                <h2 className="results-title">
                  {currentView === 'search' ? 'Search Results' :
                    currentView === 'category' ? 'Filtered by Category' :
                      currentView === 'area' ? 'Filtered by Cuisine' :
                        'Featured Recipes'}
                </h2>
                <p className="results-count">{meals.length} recipes found</p>
              </div>
              <div className="meals-grid">
                {meals.map((meal) => (
                  <MealCard
                    key={meal.idMeal}
                    meal={meal}
                    onClick={handleMealClick}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="empty-state">
              <div className="empty-icon">🔍</div>
              <h3>No recipes found</h3>
              <p>Try adjusting your search or filters</p>
              <button onClick={loadFeaturedMeals} className="btn btn-primary">
                View Featured Recipes
              </button>
            </div>
          )}
        </div>
      </main>

      {selectedMealId && (
        <MealDetail
          mealId={selectedMealId}
          onClose={handleCloseModal}
        />
      )}

      <footer className="footer">
        <div className="container">
          <p>Powered by <a href="https://www.themealdb.com/" target="_blank" rel="noopener noreferrer">TheMealDB</a></p>
          <p>© 2025 FlavorFinder - Discover Your Next Favorite Recipe</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
