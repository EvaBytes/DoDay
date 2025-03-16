import React from "react";
import { SlidersHorizontal, Plus, ChevronLeft, ChevronRight } from "lucide-react";

const Navbar = ({toggleSidebar,sidebarOpen,newItem,setNewItem,addItem,filterDropdownOpen,setFilterDropdownOpen,currentFilter,setCurrentFilter}) => {
  return (
    <nav
      className="fixed top-0 bg-white shadow-md z-20 p-4 flex justify-between items-center transition-all duration-300"
      style={{
        width: sidebarOpen ? "calc(100% - 20%)" : "100%", 
        left: sidebarOpen ? "20%" : "0", 
      }}
    >
      <button
        onClick={toggleSidebar}
        className="p-2 bg-gray-200 rounded-lg hover:bg-gray-300"
        aria-label="Toggle sidebar"
      >
        {sidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
      </button>
      <div className="flex items-center gap-2 w-full max-w-lg mx-auto">
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addItem()}
          placeholder="Add a new task..."
          className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-green-900"
        />
        <button
          onClick={addItem}
          className="bg-green-800 text-white p-3 rounded-lg hover:bg-green-900 shadow-md"
          aria-label="Add new task"
        >
          <Plus size={20} />
        </button>
        <div className="relative">
          <button
            onClick={() => setFilterDropdownOpen(!filterDropdownOpen)}
            className="p-3 bg-gray-200 rounded-lg hover:bg-gray-300"
            aria-label="Filter tasks"
          >
            <SlidersHorizontal size={20} />
          </button>
          {filterDropdownOpen && (
            <div className="absolute right-0 mt-2 bg-white border rounded shadow-lg">
              {["All", "Active", "Completed"].map((filter) => (
                <button
                  key={filter}
                  onClick={() => {
                    setCurrentFilter(filter);
                    setFilterDropdownOpen(false);
                  }}
                  className={`block px-4 py-2 text-sm w-full text-left hover:bg-gray-100 ${
                    currentFilter === filter ? "bold" : ""
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;