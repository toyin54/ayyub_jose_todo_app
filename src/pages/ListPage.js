import React, { useState } from "react";

export default function TodoPage(){
    const [inputTask, setInputTask] = useState('');
    const [todo, setTodo] = useState([]);
    const [description, setDescription] = useState('');

    //function handleTd, this combines all the props
    //instead of having a different usestate fucnton for each prop
    const handleAddTodo = () => {
        const newTask = {
            id: Math.random(),
            description,
            todo: inputTask,
            complete: false,
            dateCompleted: null,
            dateCreated :Date(Date.now()).toString()
        };

        setTodo([...todo, newTask]);
        setInputTask('');
        setDescription('');
    };

    //hnadles the delete button
   const handleDeleteTodo = (id) => {
        const newtodo = todo.filter((todo) => todo.id !== id);
        setTodo(newtodo);
    };

    
    //hnadles the input change for the task
   const handleInputChange = (event) => {
        setInputTask(event.target.value);
    };

    //hnadles the input change for the description
    const handleInputDescChange = (event) => {
        setDescription(event.target.value);
    };

   return (
        <div className="main">
            <div class="header">
                <h1>My To-Do list</h1>
            </div>

            <div className="task">
                <header>Author : {}</header>
                <label>Enter task: </label>
                <input type="text" value={inputTask}
                   onChange={handleInputChange} placeholder="Enter a task"
                required/>
                
                <textarea placeholder="Enter Desciption of Task"
                value={description}
                onChange={handleInputDescChange}/>
                <button onClick={handleAddTodo}
                disabled = {inputTask.length === 0}>ADD</button>
            </div>
           <div class="list">
               <ul>
                    { todo.map((todo) => (
                        <li className="task" key={todo.id}>
                            <strong>{todo.todo}</strong>
                            <p>{todo.description}</p>
                            <p>Complete: {todo.complete ? 'Yes' : 'No'}</p>
                            {/* <p>Created: {new Date(todo.dateCreated).toLocaleString()}</p> */}
                            <p>Created: { todo.dateCreated}</p>
                            <button onClick={() => handleDeleteTodo(todo.id)}>
                               Delete
                           </button>
                        </li>
                    ))}
                </ul>
           </div>
        </div>
    )
}