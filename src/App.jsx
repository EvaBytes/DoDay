import './App.css';
import React, { useState } from 'react';
import ChecklistItem from './components/ChecklistItem';

function App() {

  const [checklist, setChecklist] = useState([]);
  const [newItem, setNewItem] = useState(''); 

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
    setChecklist(checklist.map((task) => ({ ...task, checked: true })));
  };

  return (
    <div className="relative min-h-screen">

      <div
        className="fixed top-0 left-0 w-full h-full bg-cover bg-center -z-10"
        style={{
          backgroundImage: "url('/Background.jpg')",
        }}
      ></div>

      <div className="container mx-auto text-center relative z-10 p-4">
        <h1 className="text-5xl font-bold my-10 text-black">Check List</h1>

        <div className="flex justify-center mb-6">
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addItem()} 
            placeholder="Add a new task..."
            className="border rounded-lg p-2 w-1/3 focus:outline-none focus:ring-2 focus:ring-green-900 mr-2"
          />
          <button
            onClick={addItem}
            className="bg-green-900 text-white w-10 h-10 flex items-center justify-center rounded-full hover:bg-green-700 shadow-md"
          >
            <span className="text-xl font-bold leading-none">+</span>
          </button>
        </div>

        <button
          onClick={checkAllItems}
          className="bg-green-900 text-white py-2 px-4 rounded mb-6 hover:bg-green-700"
        >
          Check All
        </button>

        <ul className="bg-white shadow-md rounded-lg w-1/2 mx-auto p-4">
          {checklist.length > 0 ? (
            checklist.map((item, index) => (
              <ChecklistItem
                key={index}
                item={item}
                onDelete={() => deleteItem(index)}
                onToggle={() => toggleItem(index)} 
              />
            ))
          ) : (
            <h2 className="text-2xl font-bold text-cyan-800">No tasks yet...</h2>
          )}
        </ul>
      </div>
    </div>
  );
}

export default App;
