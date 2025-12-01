import React from 'react';
import './Header.css';

const Header = ({ onSearch, searchQuery, setSearchQuery }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            onSearch(searchQuery);
        }
    };

    return (
        <header className="header">
            <div className="container">
                <div className="header-content">
                    <div className="logo-section">
                        <h1 className="logo">
                            <span className="logo-icon">🍳</span>
                            FlavorFinder
                        </h1>
                        <p className="tagline">Discover delicious recipes from around the world</p>
                    </div>

                    <form className="search-form" onSubmit={handleSubmit}>
                        <div className="search-wrapper">
                            <input
                                type="text"
                                placeholder="Search for recipes..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="search-input"
                            />
                            <button type="submit" className="btn btn-primary search-btn">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="11" cy="11" r="8"></circle>
                                    <path d="m21 21-4.35-4.35"></path>
                                </svg>
                                Search
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </header>
    );
};

export default Header;
