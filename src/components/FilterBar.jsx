import React, { useState, useEffect } from 'react';
import { mealAPI } from '../services/api';
import './FilterBar.css';

const FilterBar = ({ onFilter, onRandomMeal }) => {
    const [categories, setCategories] = useState([]);
    const [areas, setAreas] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedArea, setSelectedArea] = useState('');
    const [activeFilter, setActiveFilter] = useState('all');

    useEffect(() => {
        loadFilters();
    }, []);

    const loadFilters = async () => {
        try {
            const [categoriesData, areasData] = await Promise.all([
                mealAPI.listCategories(),
                mealAPI.listAreas()
            ]);
            setCategories(categoriesData.meals || []);
            setAreas(areasData.meals || []);
        } catch (error) {
            console.error('Error loading filters:', error);
        }
    };

    const handleCategoryChange = (e) => {
        const category = e.target.value;
        setSelectedCategory(category);
        setSelectedArea('');
        if (category) {
            setActiveFilter('category');
            onFilter('category', category);
        } else {
            setActiveFilter('all');
            onFilter('all', '');
        }
    };

    const handleAreaChange = (e) => {
        const area = e.target.value;
        setSelectedArea(area);
        setSelectedCategory('');
        if (area) {
            setActiveFilter('area');
            onFilter('area', area);
        } else {
            setActiveFilter('all');
            onFilter('all', '');
        }
    };

    const handleReset = () => {
        setSelectedCategory('');
        setSelectedArea('');
        setActiveFilter('all');
        onFilter('all', '');
    };

    return (
        <div className="filter-bar">
            <div className="container">
                <div className="filter-content">
                    <div className="filter-group">
                        <label className="filter-label">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                            Category
                        </label>
                        <select
                            value={selectedCategory}
                            onChange={handleCategoryChange}
                            className="filter-select"
                        >
                            <option value="">All Categories</option>
                            {categories.map((cat) => (
                                <option key={cat.strCategory} value={cat.strCategory}>
                                    {cat.strCategory}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="filter-group">
                        <label className="filter-label">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                <circle cx="12" cy="10" r="3"></circle>
                            </svg>
                            Cuisine
                        </label>
                        <select
                            value={selectedArea}
                            onChange={handleAreaChange}
                            className="filter-select"
                        >
                            <option value="">All Cuisines</option>
                            {areas.map((area) => (
                                <option key={area.strArea} value={area.strArea}>
                                    {area.strArea}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="filter-actions">
                        <button
                            onClick={handleReset}
                            className="btn btn-secondary"
                            disabled={activeFilter === 'all'}
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"></path>
                                <path d="M21 3v5h-5"></path>
                                <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"></path>
                                <path d="M3 21v-5h5"></path>
                            </svg>
                            Reset
                        </button>
                        <button
                            onClick={onRandomMeal}
                            className="btn btn-primary random-btn"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="m2 18 1.5-1.5"></path>
                                <path d="m22 6-1.5 1.5"></path>
                                <path d="M18 2l4 4-4 4"></path>
                                <path d="M6 22l-4-4 4-4"></path>
                                <path d="M2 6l8.5 8.5"></path>
                                <path d="M22 18l-8.5-8.5"></path>
                            </svg>
                            Surprise Me!
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FilterBar;
