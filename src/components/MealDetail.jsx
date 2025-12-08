import React, { useEffect, useState } from 'react';
import { mealAPI } from '../services/api';
import './MealDetail.css';

const MealDetail = ({ mealId, onClose }) => {
    const [meal, setMeal] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadMealDetails();
    }, [mealId]);


    const loadMealDetails = async () => {
        try {
            setLoading(true);
            const data = await mealAPI.getMealById(mealId);
            if (data.meals && data.meals.length > 0) {
                setMeal(data.meals[0]);
            }
        } catch (error) {
            console.error('Error loading meal details:', error);
        } finally {
            setLoading(false);
        }
    };

    const getIngredients = () => {
        if (!meal) return [];
        const ingredients = [];
        for (let i = 1; i <= 20; i++) {
            const ingredient = meal[`strIngredient${i}`];
            const measure = meal[`strMeasure${i}`];
            if (ingredient && ingredient.trim()) {
                ingredients.push({ ingredient, measure });
            }
        }
        return ingredients;
    };

    if (loading) {
        return (
            <div className="modal-overlay" onClick={onClose}>
                <div className="modal-content loading" onClick={(e) => e.stopPropagation()}>
                    <div className="loading-spinner"></div>
                    <p>Loading recipe...</p>
                </div>
            </div>
        );
    }

    if (!meal) {
        return null;
    }

    const ingredients = getIngredients();

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-btn" onClick={onClose}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>

                <div className="modal-header">
                    <img src={mealAPI.getMealThumbnail(meal.strMealThumb, 'full')} alt={meal.strMeal} className="modal-image" loading="lazy" />
                    <div className="modal-header-content">
                        <h2 className="modal-title">{meal.strMeal}</h2>
                        <div className="modal-badges">
                            {meal.strCategory && (
                                <span className="badge badge-category">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M4 6h16M4 12h16M4 18h16"></path>
                                    </svg>
                                    {meal.strCategory}
                                </span>
                            )}
                            {meal.strArea && (
                                <span className="badge badge-area">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                        <circle cx="12" cy="10" r="3"></circle>
                                    </svg>
                                    {meal.strArea}
                                </span>
                            )}
                            {meal.strTags && (
                                <span className="badge badge-tags">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                                        <line x1="7" y1="7" x2="7.01" y2="7"></line>
                                    </svg>
                                    {meal.strTags.split(',')[0]}
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                <div className="modal-body">
                    <section className="ingredients-section">
                        <h3 className="section-title">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"></path>
                                <path d="M7 2v20"></path>
                                <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"></path>
                            </svg>
                            Ingredients
                        </h3>
                        <ul className="ingredients-list">
                            {ingredients.map((item, index) => (
                                <li key={index} className="ingredient-item">
                                    <span className="ingredient-icon">🥘</span>
                                    <span className="ingredient-name">{item.ingredient}</span>
                                    <span className="ingredient-measure">{item.measure}</span>
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section className="instructions-section">
                        <h3 className="section-title">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M12 20h9"></path>
                                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                            </svg>
                            Instructions
                        </h3>
                        <div className="instructions-content">
                            {meal.strInstructions.split('\n').map((paragraph, index) => (
                                paragraph.trim() && <p key={index}>{paragraph}</p>
                            ))}
                        </div>
                    </section>

                    {meal.strYoutube && (
                        <section className="video-section">
                            <h3 className="section-title">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                                </svg>
                                Video Tutorial
                            </h3>
                            <div className="video-wrapper">
                                <iframe
                                    src={`https://www.youtube.com/embed/${meal.strYoutube.split('v=')[1]}`}
                                    title="Recipe Video"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </section>
                    )}

                    {meal.strSource && (
                        <div className="source-link">
                            <a href={meal.strSource} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                    <polyline points="15 3 21 3 21 9"></polyline>
                                    <line x1="10" y1="14" x2="21" y2="3"></line>
                                </svg>
                                View Original Recipe
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MealDetail;
