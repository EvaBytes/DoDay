import React from 'react';

function ChecklistItem({ item, onDelete, onToggle }) {
    return (
    <li className="flex items-center justify-between p-2 border-b last:border-b-0">
        <div className="flex items-center">
            <input
            type="checkbox"
            checked={item.checked} 
            onChange={onToggle} 
            className="mr-3 w-5 h-5 accent-purple-400"
        />
        
        <span
        className={`text-gray-700 ${
            item.checked ? 'line-through text-gray-400' : ''
        }`}
        >
            {item.text}
        </span>
        </div>
        
        <button onClick={onDelete} className="hover:opacity-80">
            <img
            src="/trash-icon.png"
            alt="Delete"
            className="w-6 h-6"
        />
        </button>
    </li>
    );
}

export default ChecklistItem;


