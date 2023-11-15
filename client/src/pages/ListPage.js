import React, { useContext, useState } from "react";
import { useResource } from "react-request-hook";
import { StateContext } from "../components/contexts";

export default function TodoPage(){
    const [inputTask, setInputTask] = useState('');
    const [todo, setTodo] = useState([]);
    const [description, setDescription] = useState('');
    const [isChecked, setChecked] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);   

    const { state, dispatch } = useContext(StateContext);
    const { user } = state;
   

    const [post, createPost] = useResource((newTask) => ({
        url: "/posts",
        method: "post",
        data: {   
            description,
            todo: inputTask,
            complete:isChecked,
            dateCompleted: selectedDate,
            dateCreated :Date(Date.now()).toString()},
      }));
    
    const [delpost, deletePost] = useResource((newTask) => ({
        url: "/posts",
        method: 'delete',
        
      }));

    //function handleTd, this combines all the props
    //instead of having a different usestate fucnton for each prop
    const handleAddTodo = () => {
        const newTask = {
            id: Math.random(),
            description,
            todo: inputTask,
            complete:isChecked,
            dateCompleted: selectedDate,
            dateCreated :Date(Date.now()).toString()
        };

        setTodo([...todo,newTask]);
        createPost(newTask);
        setInputTask('');
        setDescription('');
        setChecked(false);
        setSelectedDate(false);
    };

    //


    //hnadles the delete button
   const handleDeleteTodo = (id) => {
        console.log('Deleting todo with id:', id);
        const newtodo = todo.filter((todo) => todo.id !== id);
        deletePost({ id });
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


  const handleCheckboxChange = () => {
    setChecked(!isChecked);
    // If the checkbox is checked, set the selected date
    if (!isChecked) {
      const currentDate = new Date();
      setSelectedDate(Date(Date.now()).toString());
    } else {
      
      setChecked(true);
    }
  };
   return (
        <div className="main">
            <div class="header">
                <h1>My To-Do list</h1>
            </div>

            <div className="task">
                <header>Author : {state.user}</header>
                <label>Enter task: </label>
                <input 
                    type="text" 
                    value={inputTask}
                    onChange={handleInputChange}
                        placeholder="Enter a task"
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
                            <p>Complete: 
                                <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={handleCheckboxChange}/>
                            </p>
                            <p>Created: { todo.dateCreated}</p>
                            <p>Finished: {isChecked && selectedDate && ( selectedDate)}</p>
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