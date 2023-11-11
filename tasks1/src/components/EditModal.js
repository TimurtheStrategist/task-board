import React, { useState } from 'react';
export const EditModal = ({ show, hideModal, task }) => {

    const [myValue, setMyValue] = useState(task ? task.name : null);

    const handleChange = (event) => {
        setMyValue(event.target.value);
      };
    
    return (
        show && (
                <div className="modal" style={{ display: 'block' }} tabIndex="-1">
                    <div className="modal-dialog">
              <div className="modal-content">
                  <div className="modal-header">
                      <h5 className="modal-title">Modal title</h5>
                      <button type="button" className="btn-close" onClick={hideModal} aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                  <form>
                    <div className="mb-3">
                        <label for="nameInput" className="form-label">Name</label>
                        <input type="name" className="form-control" value={task ? myValue : null} onChange={handleChange} id="nameInput"/>    
                    </div>
                    <div className="mb-3">
                        <label for="dateInput" className="form-label">Due Date</label>
                        <input type="date" className="form-control" value={task ? task.due.slice(0, 10) : null} id="dateInput"/>
                    </div>
                </form>
                  </div>
                  <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" onClick={hideModal}>Close</button>
                      <button type="button" className="btn btn-primary">Save changes</button>
                  </div>
              </div>
          </div>
        </div>
        
            )
            
        
        
    )
  }
  