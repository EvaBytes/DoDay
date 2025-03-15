import React from "react";
import { Pencil, Trash } from "lucide-react";

const ChecklistItem = ({item,onDelete,onToggle,onEdit,isEditing,editedTaskText,setEditedTaskText,saveEdit}) => {
  return (
    <li className="flex items-center justify-between p-2 border-b">
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={item.checked}
          onChange={onToggle}
          className="mr-2"
        />
        {isEditing ? (
          <input
            type="text"
            value={editedTaskText}
            onChange={(e) => setEditedTaskText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && saveEdit()}
            className="border rounded-lg p-1 focus:outline-none focus:ring-2 focus:ring-green-900"
          />
        ) : (
          <span className={item.checked ? "line-through text-gray-400" : ""}>
            {item.text}
          </span>
        )}
      </div>
      <div className="flex gap-2">
        <button
          onClick={onEdit}
          className="p-1 text-green-600 hover:text-green-800"
        >
          <Pencil size={16} />
        </button>
        <button
          onClick={onDelete}
          className="p-1 text-red-500 hover:text-red-700"
        >
          <Trash size={16} />
        </button>
      </div>
    </li>
  );
};

export default ChecklistItem;