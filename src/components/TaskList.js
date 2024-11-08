import React, { useState } from 'react';
 // Import Link for routing

function TaskList() {
  const [tasks, setTasks] = useState({
    todo: [{ id: 1, text: "Need to go to market" }],
    inProcess: [],
    done: [],
  });

  const [showMenu, setShowMenu] = useState(null); // Stores the ID of the task with an open menu
  const [newTaskText, setNewTaskText] = useState(''); // Tracks the new task text

  const addTask = () => {
    if (newTaskText.trim()) {
      setTasks((prevTasks) => ({
        ...prevTasks,
        todo: [...prevTasks.todo, { id: Date.now(), text: newTaskText }],
      }));
      setNewTaskText(''); // Clear the input and hide the button
    }
  };

  const moveTask = (taskId, from, to) => {
    setTasks((prevTasks) => {
      const taskToMove = prevTasks[from].find((task) => task.id === taskId);
      return {
        ...prevTasks,
        [from]: prevTasks[from].filter((task) => task.id !== taskId),
        [to]: [...prevTasks[to], taskToMove],
      };
    });
    setShowMenu(null); // Close the menu when a task is moved
  };

  const deleteTask = (taskId, listName) => {
    setTasks((prevTasks) => ({
      ...prevTasks,
      [listName]: prevTasks[listName].filter((task) => task.id !== taskId),
    }));
    setShowMenu(null); // Close the menu when a task is deleted
  };

  const toggleMenu = (taskId) => {
    setShowMenu(showMenu === taskId ? null : taskId); // Toggle menu visibility
  };

  const renderMenu = (taskId, listName) => (
    showMenu === taskId && (
      <div className="absolute right-0 bg-white border border-[#5200ff] p-2 shadow-lg rounded-lg z-10">
        {listName === "todo" && (
          <>
            <div onClick={() => moveTask(taskId, "todo", "inProcess")} className="cursor-pointer hover:bg-[#5200ff] p-1 rounded">In Process</div>
            <div onClick={() => moveTask(taskId, "todo", "done")} className="cursor-pointer hover:bg-[#5200ff] p-1 rounded">Done</div>
          </>
        )}
        {listName === "inProcess" && (
          <>
            <div onClick={() => moveTask(taskId, "inProcess", "todo")} className="cursor-pointer hover:bg-[#5200ff] p-1 rounded">To Do</div>
            <div onClick={() => moveTask(taskId, "inProcess", "done")} className="cursor-pointer hover:bg-[#5200ff] p-1 rounded">Done</div>
          </>
        )}
        {listName === "done" && (
          <>
            <div onClick={() => moveTask(taskId, "done", "todo")} className="cursor-pointer hover:bg-[#5200ff] p-1 rounded">To Do</div>
            <div onClick={() => moveTask(taskId, "done", "inProcess")} className="cursor-pointer hover:bg-[#5200ff] p-1 rounded">In Process</div>
          </>
        )}
        <div onClick={() => deleteTask(taskId, listName)} className="cursor-pointer hover:bg-red-500 p-1 rounded">Delete</div>
      </div>
    )
  );

  const renderTask = (task, listName) => (
    <div key={task.id} className="relative flex justify-between items-center bg-white border border-[#5200ff] p-2 rounded-lg mb-2 shadow">
      <span className="text-black">{task.text}</span>
      <span onClick={() => toggleMenu(task.id)} className="cursor-pointer text-[#5200ff]">⋮</span>
      {renderMenu(task.id, listName)}
    </div>
  );

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4 max-w-screen-lg mx-auto">
      {/* To Do Card */}
      <div className="w-full md:w-1/3 bg-white border border-[#5200ff] p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4 text-black">To Do</h3>
        {tasks.todo.map((task) => renderTask(task, "todo"))}

        {/* Input for Adding a New Task */}
        <input
          type="text"
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          placeholder="+ Add task..."
          className="border border-[#5200ff] p-2 rounded w-full mt-4"
        />

        {/* Show the Add Task button only when there is text in the input */}
        {newTaskText && (
          <button
            onClick={addTask}
            className="w-full mt-2 bg-[#5200ff] text-white font-semibold py-2 rounded"
          >
            Add Task
          </button>
        )}
      </div>

      {/* In Process Card */}
      <div className="w-full md:w-1/3 bg-white border border-[#5200ff] p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4 text-black">In Process</h3>
        {tasks.inProcess.map((task) => renderTask(task, "inProcess"))}
      </div>

      {/* Done Card */}
      <div className="w-full md:w-1/3 bg-white border border-[#5200ff] p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4 text-black">Done</h3>
        {tasks.done.map((task) => renderTask(task, "done"))}
      </div>
    </div>
  );
}

export default TaskList;







