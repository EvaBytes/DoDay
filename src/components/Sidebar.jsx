import React, { useState } from "react";
import { Pencil, Trash, MoreVertical } from "lucide-react"; 
import SidebarFooter from "./SidebarFooter"; 

const Sidebar = ({sidebarOpen,lists,createNewList,setActiveListId,activeListId,deleteList,editList}) => {
  const [editingListId, setEditingListId] = useState(null); 
  const [newListName, setNewListName] = useState(""); 
  const [dropdownOpen, setDropdownOpen] = useState(null);

  const handleSaveEdit = (listId) => {
    if (newListName.trim()) {
      editList(listId, newListName);
      setEditingListId(null); 
      setNewListName(""); 
    }
  };

  const toggleDropdown = (listId, event) => {
    event.stopPropagation(); 
    setDropdownOpen(dropdownOpen === listId ? null : listId);
  };

  const closeDropdown = (event) => {
    if (!event.target.closest(".dropdown-container")) {
      setDropdownOpen(null);
    }
  };

  React.useEffect(() => {
    document.addEventListener("click", closeDropdown);
    return () => {
      document.removeEventListener("click", closeDropdown);
    };
  }, []);

  return (
    <>
      {sidebarOpen && (
        <div
          className="w-[20%] bg-white shadow-md h-screen fixed z-20 p-4 flex flex-col" 
          style={{ left: 0 }}
        >
          <div>
            <img src="/Logo.png" alt="DoDay List Logo" className="h-10 mb-4" />
            <button
              onClick={createNewList}
              className="w-full bg-green-800 text-white p-2 rounded-lg hover:bg-green-900 shadow-md mb-4"
            >
              Create New List
            </button>
          </div>

          <ul className="flex-1 overflow-y-auto">
            {lists.map((list) => (
              <li
                key={list.id}
                className={`p-2 cursor-pointer flex justify-between items-center ${
                  activeListId === list.id
                    ? "bg-green-100 text-green-800"
                    : "hover:bg-gray-100"
                }`}
                onClick={() => setActiveListId(list.id)}
              >
                {editingListId === list.id ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={newListName}
                      onChange={(e) => setNewListName(e.target.value)}
                      className="border rounded-lg p-1 focus:outline-none focus:ring-2 focus:ring-green-900"
                      placeholder="Nuevo nombre"
                    />
                    <button
                      onClick={() => handleSaveEdit(list.id)}
                      className="p-1 bg-green-800 text-white rounded-lg hover:bg-green-900"
                    >
                      Guardar
                    </button>
                  </div>
                ) : (
                  <span className="flex-1">{list.name}</span>
                )}

                <div className="relative dropdown-container">
                  <button
                    onClick={(e) => toggleDropdown(list.id, e)}
                    className="p-1 text-gray-500 hover:text-gray-700"
                  >
                    <MoreVertical size={16} />
                  </button>

                  {dropdownOpen === list.id && (
                    <div className="absolute right-0 mt-2 bg-white border rounded shadow-lg">
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); 
                          setEditingListId(list.id);
                          setNewListName(list.name); 
                          setDropdownOpen(null); 
                        }}
                        className="flex items-center gap-2 px-4 py-2 text-sm w-full text-left hover:bg-gray-100"
                      >
                        <Pencil size={16} />
                        Editar
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); 
                          deleteList(list.id);
                          setDropdownOpen(null); 
                        }}
                        className="flex items-center gap-2 px-4 py-2 text-sm w-full text-left hover:bg-gray-100"
                      >
                        <Trash size={16} />
                        Borrar
                      </button>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>

          <SidebarFooter />
        </div>
      )}
    </>
  );
};

export default Sidebar;