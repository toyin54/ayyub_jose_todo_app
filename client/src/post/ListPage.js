import React, { useContext, useState , useEffect } from "react";
import { useResource } from "react-request-hook";
import { StateContext } from "../contexts";
import { v4 as uuidv4 } from "uuid";


export default function TodoPage(){
    const [inputTask, setInputTask] = useState('');
    const [todo, setTodo] = useState([]);
    const [description, setDescription] = useState('');
    const [isChecked, setChecked] = useState();
    const [selectedDate, setSelectedDate] = useState(null);   

    const { state, dispatch } = useContext(StateContext);
    const { user } = state;
   
//Create post
    const [post, createPost] = useResource((newTask) => ({
        url: "/post",
        method: "post",
        headers: { Authorization: `${state.user.access_token}` },
        data: { 
            description,
            todo: inputTask,
            complete:false,
            dateCreated :Date(Date.now()).toString(),
            dateCompleted: selectedDate,
            auhor:state.user,
        },      
      }));
    //delete post
    const [delpost, deletePost] = useResource((id) => ({
        url: `/post/${id}`,
        method: 'delete',
        headers: { Authorization: `${state.user.access_token}` },
        
      }));

      // toggle post
      const [togglePost, setTogglePost] = useResource((id) => ({
        url: `/post/${id}`,
        method: 'patch',
        headers: { Authorization: `${state.user.access_token}` },
        data:{dateCompleted: selectedDate,}
        
      }));

    


    //function handleTd, this combines all the props
    //instead of having a different usestate fucnton for each prop
    const handleAddTodo = () => {
        const newTask = {
            id: uuidv4(),
            description,
            todo: inputTask,
            dateCreated :Date(Date.now()).toString(),
            complete:false,
            dateCompleted: selectedDate,
            auhor:state.user,
        };
        setTodo([...todo,newTask]);
        createPost(newTask);
        setInputTask('');
        setDescription('');
        setSelectedDate(false);
        console.log(todo.id)
    };

    //Create Pst useEffect
    useEffect(() => {
        if (post.isLoading === false && post.data) {
          dispatch({
            type: "CREATE_POST",
            description: post.data.description,
            todo: post.data.todo,
            id: post.data.id,
            author: user.username,
          });
        }
      }, [post]);

      console.log(post)
      console.log(post)

//     //hnadles the delete button
    const handleDeleteTodo = (id) => {
        console.log('Deleting todo with id:', id);
        
        const newtodo = todo.filter((todo) => todo.id !== id);
        if(newtodo){
        deletePost(post.data.id);
        // dispatch({ type: "DELETE_TODO", id: newtodo.id });
        }
        setTodo(newtodo);

    };
    //toggle todo
    const handleToggleTodo = (id) => {
        console.log('Marking as completed todo with id:', id); 
        const nowDate = Date(Date.now()).toString();
        //setTogglePost(post.data.id ,nowDate )
        setTodo((prevTodo) => {
            return prevTodo.map((todo) => {
              if (todo.id === id) {
                // If the task ID matches, update the dateCompleted field
                return {
                  ...todo,
                  complete:true,
                  dateCompleted:Date(Date.now()).toString() };  
              }
              return todo;
            })
        })           
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
      
    //   setChecked(true);
    }
  };
   return (
    <>
     { user &&  <div className="main">
            
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
                disabled = {inputTask.length === 0}>ADD </button>
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
                            <p>Finished: {todo.dateCompleted}\</p>
                            <button onClick={() => handleDeleteTodo(todo.id)}>
                               Delete
                           </button>
                           <button onClick={() => handleToggleTodo(todo.id)}>
                               Mark as Completed
                           </button>
                        </li>
                    ))}
                </ul>
           </div>
        </div>}

        </>
    )
}