import React from 'react';

/**
 * Sidebar component - displays language filters with counts
 */
export default function Sidebar({ categories, selectedCategory, onSelectCategory, gistsCount }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>Languages</h2>
        <span className="total-count">{gistsCount} gists</span>
      </div>

      <div className="category-list">
        <button
          className={`category-item ${selectedCategory === null ? 'active' : ''}`}
          onClick={() => onSelectCategory(null)}
        >
          <span className="category-name">All Gists</span>
          <span className="category-count">{gistsCount}</span>
        </button>

        {categories.map(({ extension, count }) => (
          <button
            key={extension}
            className={`category-item ${selectedCategory === extension ? 'active' : ''}`}
            onClick={() => onSelectCategory(extension)}
          >
            <span className="category-name">.{extension}</span>
            <span className="category-count">{count}</span>
          </button>
        ))}
      </div>
    </aside>
  );
}
