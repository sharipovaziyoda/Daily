import React, { useState, useEffect } from 'react';

// Replace ACCESS_TOKEN with your actual token
const ACCESS_TOKEN = 'your_access_token_here';

function ToDoList() {
  const [tasks, setTasks] = useState({ todo: [], inProcess: [], done: [] });
  const [newTask, setNewTask] = useState('');

  // Fetch tasks on load
  useEffect(() => {
    fetchTasks();
  }, []);

  // Fetch all tasks
  const fetchTasks = async () => {
    try {
      const response = await fetch('https://todoapi.pythonanywhere.com/api/special-tasks/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${ACCESS_TOKEN}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        const organizedTasks = { todo: [], inProcess: [], done: [] };

        // Organize tasks based on status
        data.forEach((task) => {
          if (task.status === 'To Do') organizedTasks.todo.push(task);
          else if (task.status === 'In Process') organizedTasks.inProcess.push(task);
          else if (task.status === 'Done') organizedTasks.done.push(task);
        });

        setTasks(organizedTasks);
      } else {
        console.error('Failed to fetch tasks.');
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  // Add a new task to "To Do"
  const addTask = async () => {
    if (newTask.trim()) {
      try {
        const response = await fetch('https://todoapi.pythonanywhere.com/api/special-tasks/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${ACCESS_TOKEN}`,
          },
          body: JSON.stringify({ title: newTask, status: 'To Do' }),
        });
        if (response.ok) {
          setNewTask('');
          fetchTasks(); // Refresh tasks
        } else {
          console.error('Failed to add task.');
        }
      } catch (error) {
        console.error('Error adding task:', error);
      }
    }
  };

  // Update task status
  const updateTaskStatus = async (task, newStatus) => {
    try {
      const response = await fetch(`https://todoapi.pythonanywhere.com/api/special-tasks-id/${task.id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${ACCESS_TOKEN}`,
        },
        body: JSON.stringify({ title: task.title, status: newStatus }),
      });
      if (response.ok) {
        fetchTasks(); // Refresh tasks after updating
      } else {
        console.error('Failed to update task status.');
      }
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  // Delete a task
  const deleteTask = async (taskId) => {
    try {
      const response = await fetch(`https://todoapi.pythonanywhere.com/api/special-tasks-id/${taskId}/`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${ACCESS_TOKEN}`,
        },
      });
      if (response.ok) {
        fetchTasks(); // Refresh tasks after deletion
      } else {
        console.error('Failed to delete task.');
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  // Render tasks with options to move or delete
  const renderTasks = (tasks, status) =>
    tasks.map((task) => (
      <div
        key={task.id}
        className="flex justify-between items-center p-2 border-b border-gray-300 relative"
      >
        <span>{task.title}</span>
        <div className="relative">
          <button className="text-gray-500 hover:text-gray-700">
            &#x22EE; {/* Three dots */}
          </button>
          <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-lg z-10 hidden group-hover:block">
            {status !== 'To Do' && (
              <button
                onClick={() => updateTaskStatus(task, 'To Do')}
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
              >
                Move to To Do
              </button>
            )}
            {status !== 'In Process' && (
              <button
                onClick={() => updateTaskStatus(task, 'In Process')}
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
              >
                Move to In Process
              </button>
            )}
            {status !== 'Done' && (
              <button
                onClick={() => updateTaskStatus(task, 'Done')}
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
              >
                Move to Done
              </button>
            )}
            <button
              onClick={() => deleteTask(task.id)}
              className="block px-4 py-2 text-red-500 hover:bg-gray-100 w-full text-left"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    ));

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold text-[#5200ff] mb-6">To-Do List</h1>

      <div className="flex space-x-4 w-full max-w-3xl">
        {/* To Do List */}
        <div className="flex-1 bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">To Do</h2>
          <div className="mb-4">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Add new task..."
              className="p-2 border rounded-lg w-full focus:outline-none focus:border-[#5200ff]"
            />
            <button
              onClick={addTask}
              className="mt-2 w-full bg-[#5200ff] text-white px-4 py-2 rounded-lg hover:bg-[#4200cc]"
            >
              Add Task
            </button>
          </div>
          {renderTasks(tasks.todo, 'To Do')}
        </div>

        {/* In Process List */}
        <div className="flex-1 bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">In Process</h2>
          {renderTasks(tasks.inProcess, 'In Process')}
        </div>

        {/* Done List */}
        <div className="flex-1 bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Done</h2>
          {renderTasks(tasks.done, 'Done')}
        </div>
      </div>
    </div>
  );
}

export default ToDoList;





