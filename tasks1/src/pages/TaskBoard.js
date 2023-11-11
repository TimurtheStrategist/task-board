import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export const TaskBoard = () => {


  let [tasks, setTasks] = useState([]);
  
  useEffect(() => { 
    getTasks();
  }, [])

  let toDone = async (itemID) => {
    await fetch(`http://localhost:8000/tasks/${itemID}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'status':'completed'})
        })

  }
    
  let getTasks = async () => {
    let response = await fetch('http://localhost:8000/tasks');
    let data = await response.json();
    let results = await data.filter((task) => task.status === 'in progress'); 
    setTasks(results);
  }
  
  const handleChange = (taskID) => {
    toDone(taskID);
    setTasks((prevTasks) =>
      prevTasks.map((t) =>
        t.id === taskID ? { ...t, status: 'completed' } : t
      )
    );
  };

  return (
    <div className='col-md-8 offset-md-2'>
      
      <ul className="list-group list-group-flush">
        <li className="list-group-item d-flex justify-content-end align-items-center">
          <Link to={"/task/new"}>
            <button type="button" className="btn btn-dark">New Task</button> 
          </Link>
          
        </li>
        {tasks.map((task) => (
          task.status === 'in progress' ?
            <li className="list-group-item d-flex justify-content-between align-items-center" key={task.id}>
              <div> 
                <h5>{task.name}</h5>
                <p>Due: {task.due}</p>
              </div>
                <div className='flex-row'> 
                  <button type="button" onClick={() => handleChange(task.id)} className="btn btn-outline-success me-2">Done</button>
                  <Link to={`/task/${task.id}`} className="floating-button">
                    <button type="button" className="btn btn-secondary">Edit</button>
                  </Link> 
                </div>
            </li> : null ))}
      </ul>
    </div>
  )
}

