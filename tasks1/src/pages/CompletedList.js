import React, { useState, useEffect } from 'react'

export const CompletedList = () => {

let [tasks, setTasks] = useState([]);

useEffect(() => { 
  getTasks();
}, [])

let getTasks = async () => {
  let response = await fetch('http://localhost:8000/tasks');
  let data = await response.json();
  let results = await data.filter((task) => task.status === 'completed'); 
  setTasks(results);
}

let toProgress = async (itemID) => {
  await fetch(`http://localhost:8000/tasks/${itemID}`, {
          method: 'PATCH',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({'status':'in progress'})
      })
}

let deleteTask = async (itemID) => {
  await fetch(`http://localhost:8000/tasks/${itemID}`, {
      method: 'DELETE',
      headers: {
          'Content-Type': 'application/json'
      }
  })
}

const handleChange = (taskID) => {
  toProgress(taskID);
  setTasks((prevTasks) =>
    prevTasks.map((t) =>
      t.id === taskID ? { ...t, status: 'in progress' } : t
    )
  );
};

const handleDelete = (taskID) => {
  deleteTask(taskID);
  setTasks((prevTasks) =>
    prevTasks.filter(task => task.id !== taskID)
  );
};


  return (
    <div className='task-board col-md-8 offset-md-2'>
      <ul className="list-group list-group-flush">
        {tasks.map((task) => {
            return task.status === 'completed' ? 
            <li className="list-group-item d-flex justify-content-between align-items-center" key={task.id}>
              <div> 
                <h5>{task.name}</h5>
                <p>Due: {task.due}</p>
              </div>

              <div className='flex-row'>
                <button type="button" onClick={() => handleChange(task.id)} className="btn btn-outline-secondary me-2">Move Back</button>
              <button type="button" onClick={() => handleDelete(task.id)} className="btn btn-outline-danger">Delete</button>
              </div>
              </li> : null;
        }
        )} 
      </ul>
    </div>
  )
}

