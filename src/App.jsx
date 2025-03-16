import React, { useState } from "react";
import ChecklistItem from "./components/ChecklistItem";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import CrabTimer from "./components/CrabTimer";

function App() {
  const [lists, setLists] = useState([
    { id: 1, name: "Lista 1", tasks: [] }, 
  ]);
  const [activeListId, setActiveListId] = useState(1); 
  const [newItem, setNewItem] = useState("");
  const [allChecked, setAllChecked] = useState(false);
  const [currentFilter, setCurrentFilter] = useState("All");
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [editingTaskIndex, setEditingTaskIndex] = useState(null); 
  const [editedTaskText, setEditedTaskText] = useState(""); 

  const activeList = lists.find((list) => list.id === activeListId);
  const checklist = activeList ? activeList.tasks : [];

  const createNewList = () => {
    const newListId = lists.length + 1; 
    const newList = {
      id: newListId,
      name: `Lista ${newListId}`, 
      tasks: [], 
    };
    setLists([...lists, newList]); 
    setActiveListId(newListId); 
  };

  const deleteList = (listId) => {
    const updatedLists = lists.filter((list) => list.id !== listId);
    setLists(updatedLists);

    if (activeListId === listId) {
      setActiveListId(updatedLists[0]?.id || null);
    }
  };

  const editList = (listId, newName) => {
    const updatedLists = lists.map((list) =>
      list.id === listId ? { ...list, name: newName } : list
    );
    setLists(updatedLists);
  };

  const addItem = () => {
    if (newItem.trim()) {
      const updatedLists = lists.map((list) =>
        list.id === activeListId
          ? { ...list, tasks: [...list.tasks, { text: newItem.trim(), checked: false }] }
          : list
      );
      setLists(updatedLists);
      setNewItem("");
    }
  };

  const deleteItem = (index) => {
    const updatedLists = lists.map((list) =>
      list.id === activeListId
        ? { ...list, tasks: list.tasks.filter((_, i) => i !== index) }
        : list
    );
    setLists(updatedLists);
  };

  const toggleItem = (index) => {
    const updatedLists = lists.map((list) =>
      list.id === activeListId
        ? {
            ...list,
            tasks: list.tasks.map((task, i) =>
              i === index ? { ...task, checked: !task.checked } : task
            ),
          }
        : list
    );
    setLists(updatedLists);
  };

  const editTask = (index, newText) => {
    const updatedLists = lists.map((list) =>
      list.id === activeListId
        ? {
            ...list,
            tasks: list.tasks.map((task, i) =>
              i === index ? { ...task, text: newText } : task
            ),
          }
        : list
    );
    setLists(updatedLists);
    setEditingTaskIndex(null); 
    setEditedTaskText(""); 
  };

  const checkAllItems = () => {
    const updatedLists = lists.map((list) =>
      list.id === activeListId
        ? { ...list, tasks: list.tasks.map((task) => ({ ...task, checked: !allChecked })) }
        : list
    );
    setLists(updatedLists);
    setAllChecked(!allChecked);
  };

  const filteredChecklist = checklist.filter((item) => {
    if (currentFilter === "Active") return !item.checked;
    if (currentFilter === "Completed") return item.checked;
    return true;
  });

  return (
    <div className="relative min-h-screen">
      <div
        className="fixed top-0 left-0 w-full h-full bg-cover bg-center -z-10"
        style={{ backgroundImage: "url('/Background1.png')" }}
      ></div>

      <Navbar
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        sidebarOpen={sidebarOpen}
        newItem={newItem}
        setNewItem={setNewItem}
        addItem={addItem}
        filterDropdownOpen={filterDropdownOpen}
        setFilterDropdownOpen={setFilterDropdownOpen}
        currentFilter={currentFilter}
        setCurrentFilter={setCurrentFilter}
      />

      <Sidebar
        sidebarOpen={sidebarOpen}
        lists={lists}
        createNewList={createNewList}
        setActiveListId={setActiveListId}
        activeListId={activeListId}
        deleteList={deleteList}
        editList={editList}
      />

      <div
        className={`container mx-auto text-center relative z-10 p-4 pt-24 transition-all duration-300 ${
          sidebarOpen ? "pl-[20%]" : "pl-0"
        }`}
      >
        <button
          onClick={checkAllItems}
          className={`py-2 px-4 rounded mb-6 hover:opacity-90 ${
            allChecked ? "bg-purple-700 text-white" : "bg-green-800 text-white"
          }`}
        >
          {allChecked ? "Uncheck All" : "Check All"}
        </button>

        <ul className="bg-white shadow-md rounded-lg w-full custom-md:w-1/2 mx-auto p-4">
          {filteredChecklist.length > 0 ? (
            filteredChecklist.map((item, index) => (
              <ChecklistItem
                key={index}
                item={item}
                onDelete={() => deleteItem(index)}
                onToggle={() => toggleItem(index)}
                onEdit={() => {
                  setEditingTaskIndex(index); 
                  setEditedTaskText(item.text); 
                }}
                isEditing={editingTaskIndex === index} 
                editedTaskText={editedTaskText} 
                setEditedTaskText={setEditedTaskText}
                saveEdit={() => editTask(index, editedTaskText)} 
              />
            ))
          ) : (
            <h2 className="text-lg italic text-gray-300">
              Which task will let you sleep like a baby tonight?
            </h2>
          )}
        </ul>
      </div>
      <CrabTimer />

    </div>
  );
}

export default App;