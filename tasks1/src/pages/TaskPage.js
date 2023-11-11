import React, {useState, useEffect} from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

export const TaskPage = () => {

    const {id} = useParams();
    
    let taskID = id; 

    let [task, setTask] = useState(null);

    let navigate = useNavigate();

    useEffect(() => {
        getTask();
    }, [taskID])

    let getTask = async () => {
        if (taskID === 'new') return 
        let response = await fetch(`http://localhost:8000/tasks/${taskID}`);
        let data = await response.json();
        setTask(data);
     }


     let createTask = async () => {
        await fetch(`http://localhost:8000/tasks/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({...task, 'status':'in progress'})
        })
     }

     let updateTask = async () => {
        await fetch(`http://localhost:8000/tasks/${taskID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({...task, 'status': 'in progress'})
        })
     }

     let deleteTask = async () => {
        await fetch(`http://localhost:8000/tasks/${taskID}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        })
        navigate('/');
     }


     let handleSubmit = () => {
        if(taskID !== 'new' && !task.name){
            deleteTask();
        }else if(taskID !== 'new'){
            updateTask();
        }else if(taskID === 'new' && task !== null) {
            createTask();
        }
        navigate('/');
     }

    
  return (
    <div className='col-md-8 offset-md-2'>
        <ul className="list-group list-group-flush">
        <li className="list-group-item d-flex justify-content-left align-items-center">
        <Link to="/">
          <button type="button" className="btn btn-dark">Back</button> 
        </Link>
        </li>
        <li className="list-group-item d-flex justify-content-center align-items-center">
          <form>
                <div className="mb-3">
                    <label for="nameInput" className="form-label">Name</label>
                    <input type="name" className="form-control" onChange={(e)=> {setTask({...task, 'name': e.target.value})}} value={task?.name} id="nameInput"/>    
                </div>
                <div className="mb-3">
                    <label for="dateInput" className="form-label">Due Date</label>
                    <input type="date" className="form-control" onChange={(e)=> {setTask({...task, 'due': e.target.value})}} value={task?.due} id="dateInput"/>
                </div>
            </form>
        </li>

        <li className="list-group-item d-flex justify-content-end align-items-center">
            <div className='flex-row'>
                <Link to="/">
                    <button type="button" className="btn btn-dark me-2">Cancel</button>     
                </Link>
                
                <button type="button" onClick={handleSubmit} className="btn btn-dark">Submit</button> 
                
            </div>
        </li>
        
      </ul>
      
      
    </div>
  )
}

