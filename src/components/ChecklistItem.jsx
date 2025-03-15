import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';

function ChecklistItem({ item, onDelete, onToggle, onEdit }) {
    return (
        <li className="flex items-center justify-between p-2 border-b last:border-b-0 transition-all duration-200">
            <div className="flex items-center">
                <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={onToggle}
                    className="mr-3 w-5 h-5 accent-green-600 cursor-pointer"
                />
                <span
                    className={`text-gray-700 ${
                        item.checked ? 'line-through text-gray-400' : ''
                    }`}
                >
                    {item.text}
                </span>
            </div>

            <div className="flex space-x-2">
                <button
                    onClick={onEdit}
                    className="p-2 bg-green-500 rounded-full hover:bg-green-600 transition shadow-md active:scale-95"
                    aria-label="Edit task"
                >
                    <Pencil size={18} color="#fff" />
                </button>

                <button
                    onClick={onDelete}
                    className="p-2 bg-red-500 rounded-full hover:bg-red-600 transition shadow-md active:scale-95"
                    aria-label="Delete task"
                >
                    <Trash2 size={18} color="#fff" />
                </button>
            </div>
        </li>
    );
}

export default ChecklistItem;
