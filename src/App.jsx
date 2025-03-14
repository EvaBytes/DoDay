import React, { useState } from 'react';
import { SlidersHorizontal, Plus} from 'lucide-react';
import ChecklistItem from './components/ChecklistItem';

function App() {
  const [checklist, setChecklist] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [allChecked, setAllChecked] = useState(false);
  const [currentFilter, setCurrentFilter] = useState('All');
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);

  const addItem = () => {
    if (newItem.trim()) {
      setChecklist([...checklist, { text: newItem.trim(), checked: false }]);
      setNewItem('');
    }
  };

  const deleteItem = (index) => {
    setChecklist(checklist.filter((_, i) => i !== index));
  };

  const toggleItem = (index) => {
    setChecklist(
      checklist.map((task, i) =>
        i === index ? { ...task, checked: !task.checked } : task
      )
    );
  };

  const checkAllItems = () => {
    setChecklist(checklist.map((task) => ({ ...task, checked: !allChecked })));
    setAllChecked(!allChecked);
  };

  const filteredChecklist = checklist.filter((item) => {
    if (currentFilter === 'Active') return !item.checked;
    if (currentFilter === 'Completed') return item.checked;
    return true;
  });

  return (
    <div className="relative min-h-screen">
      <div
        className="fixed top-0 left-0 w-full h-full bg-cover bg-center -z-10"
        style={{ backgroundImage: "url('/Background.jpg')" }}
      ></div>

      <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-20 p-4 flex justify-between items-center">
        <img src="/public/Logo.png" alt="DoDay List Logo" className="h-10" />
        <div className="flex items-center gap-2 w-full max-w-lg mx-auto">
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addItem()}
            placeholder="Add a new task..."
            className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-green-900"
          />
          <button
            onClick={addItem}
            className="bg-green-900 text-white p-3 rounded-lg hover:bg-green-700 shadow-md"
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
                {['All', 'Active', 'Completed'].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => {
                      setCurrentFilter(filter);
                      setFilterDropdownOpen(false);
                    }}
                    className={`block px-4 py-2 text-sm w-full text-left hover:bg-gray-100 ${
                      currentFilter === filter ? 'font-bold' : ''
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

      <div className="container mx-auto text-center relative z-10 p-4 pt-24">
        <button
          onClick={checkAllItems}
          className={`py-2 px-4 rounded mb-6 hover:opacity-90 ${
            allChecked ? 'bg-purple-700 text-white' : 'bg-green-900 text-white'
          }`}
        >
          {allChecked ? 'Uncheck All' : 'Check All'}
        </button>

        <ul className="bg-white shadow-md rounded-lg w-full custom-md:w-1/2 mx-auto p-4">
          {filteredChecklist.length > 0 ? (
            filteredChecklist.map((item, index) => (
              <ChecklistItem
                key={index}
                item={item}
                onDelete={() => deleteItem(index)}
                onToggle={() => toggleItem(index)}
              />
            ))
          ) : (
            <h2 className="text-lg italic text-gray-300">
              Which task will let you sleep like a baby tonight?
            </h2>
          )}
        </ul>
      </div>
    </div>
  );
}

export default App;
