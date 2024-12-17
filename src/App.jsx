import './App.css';
import React, { useState } from 'react';
import ChecklistItem from './components/ChecklistItem';

function App() {
  const [checklist, setChecklist] = useState([]);

  return (
    <div className="relative min-h-screen">
      <div
        className="fixed top-0 left-0 w-full h-full bg-cover bg-center -z-10"
        style={{
          backgroundImage: "url('/Background.jpg')",
        }}
      ></div>

      <div className="container mx-auto text-center relative z-10">
        <h1 className="text-5xl font-bold my-20 text-white">Check List</h1>
        <button className="bg-blue-500 text-white py-2 px-4 rounded mb-10">
          Check All
        </button>
        <ul className="container">
          {checklist.length > 0 ? (
            checklist.map((item, index) => (
              <ChecklistItem key={index} item={item} />
            ))
          ) : (
            <h2 className="text-2xl font-bold text-cyan-800 mb-10">
              Loading...
            </h2>
          )}
        </ul>
      </div>
    </div>
  );
}

export default App;
