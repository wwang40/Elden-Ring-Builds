// components/AttributeSelector.js
import React from 'react';

function AttributeSelector({ attribute, value, onChange }) {
  return (
    <div className="attribute-item">
      <label htmlFor={attribute}>{attribute}</label>
      <div className="attribute-controls">
        <button 
          type="button" 
          onClick={() => onChange(Math.max(1, value - 1))}
          disabled={value <= 1}
        >-</button>
        <input
          type="number"
          id={attribute}
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value) || 1)}
          min="1"
          max="99"
        />
        <button 
          type="button" 
          onClick={() => onChange(Math.min(99, value + 1))}
          disabled={value >= 99}
        >+</button>
      </div>
    </div>
  );
}

export default AttributeSelector;