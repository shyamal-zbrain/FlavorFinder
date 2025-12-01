import React from 'react';
import './MealCard.css';

const MealCard = ({ meal, onClick }) => {
    return (
        <div className="meal-card" onClick={() => onClick(meal)}>
            <div className="meal-image-wrapper">
                <img
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    className="meal-image"
                    loading="lazy"
                />
                <div className="meal-overlay">
                    <button className="view-recipe-btn">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                        View Recipe
                    </button>
                </div>
            </div>

            <div className="meal-content">
                <h3 className="meal-title">{meal.strMeal}</h3>

                <div className="meal-meta">
                    {meal.strCategory && (
                        <span className="badge badge-category">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                            {meal.strCategory}
                        </span>
                    )}
                    {meal.strArea && (
                        <span className="badge badge-area">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                <circle cx="12" cy="10" r="3"></circle>
                            </svg>
                            {meal.strArea}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MealCard;
