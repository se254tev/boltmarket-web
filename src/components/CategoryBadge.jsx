import React from 'react';

/**
 * CategoryBadge Component
 * Interactive category selector badge
 * @param {string} name - Category name
 * @param {string} icon - Category icon (emoji or SVG)
 * @param {boolean} isSelected - Whether category is selected
 * @param {Function} onClick - Click handler
 */
function CategoryBadge({ name, icon, isSelected, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-2 p-4 rounded-xl transition-all duration-300 ${
        isSelected
          ? 'bg-primary-600 text-white shadow-lg scale-105'
          : 'bg-white border-2 border-dark-200 text-dark-900 hover:border-primary-400 hover:shadow-md'
      }`}
    >
      <span className="text-2xl">{icon}</span>
      <span className="text-sm font-medium text-center leading-tight">{name}</span>
    </button>
  );
}

export default CategoryBadge;
