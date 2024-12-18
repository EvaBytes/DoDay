import React, { useState } from 'react';
import ChecklistItem from './components/ChecklistItem';

function App() {
  const [checklist, setChecklist] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [allChecked, setAllChecked] = useState(false);

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

  return (
    <div className="relative min-h-screen">
      <div
        className="fixed top-0 left-0 w-full h-full bg-cover bg-center -z-10"
        style={{
          backgroundImage: "url('/Background.jpg')",
        }}
      ></div>

      <div className="container mx-auto text-center relative z-10 p-4">
        <h1 className="text-3xl custom-md:text-5xl font-bold my-6 text-black">
          DoDay List
        </h1>

        <div className="flex flex-col custom-md:flex-row justify-center mb-6">
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addItem()}
            placeholder="Add a new task..."
            className="border rounded-lg p-2 w-full custom-md:w-1/2 custom-md:max-xl focus:outline-none focus:ring-2 focus:ring-green-900 mb-2 custom-md:mb-0 custom-md:mr-2"
          />

          <button
            onClick={addItem}
            className="bg-green-900 text-white w-10 h-10 flex items-center justify-center rounded-full hover:bg-green-700 shadow-md mx-auto custom-md:mx-0"
          >
            <span className="text-xl font-bold leading-none">+</span>
          </button>
        </div>

        <button
        onClick={checkAllItems}
        className={`py-2 px-4 rounded mb-6 hover:opacity-90 ${
          allChecked
          ? 'bg-purple-700 text-white' 
          : 'bg-green-900 text-white'  
  }`}
>
  {allChecked ? 'Uncheck All' : 'Check All'}
</button>


        <ul className="bg-white shadow-md rounded-lg w-full custom-md:w-1/2 mx-auto p-4">
        
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
