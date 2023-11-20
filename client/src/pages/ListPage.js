import React, { useContext, useState , useEffect } from "react";
import { useResource } from "react-request-hook";
import { StateContext } from "../components/contexts";
import { v4 as uuidv4 } from "uuid";


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
            dateCreated :Date(Date.now()).toString(),
            auhor:state.user,
        },
            
      }));
    
    const [delpost, deletePost] = useResource((id) => ({
        url: `/posts/${id}`,
        method: 'delete',
        
      }));

    //fetch
    const [postsResponse, getPosts] = useResource(() => ({
        url: "/posts",
        method: "get",
   
      }));

      
    useEffect(getPosts, []);

    useEffect(() => {
        if (postsResponse && postsResponse.data) {
        dispatch({ type: "FETCH_POSTS", posts: postsResponse.data.reverse() });
        }
    }, [postsResponse]);
    

    //function handleTd, this combines all the props
    //instead of having a different usestate fucnton for each prop
    const handleAddTodo = () => {
        const newTask = {
            id: uuidv4(),
            description,
            todo: inputTask,
            complete:isChecked,
            dateCompleted: selectedDate,
            dateCreated :Date(Date.now()).toString(),
            auhor:state.user,
        };

        setTodo([...todo,newTask]);
        createPost(newTask);
        setInputTask('');
        setDescription('');
        setChecked(false);
        setSelectedDate(false);
        console.log(todo.id)
    };

    //
        
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
//    const handleDeleteTodo = (id) => {
//         console.log('Deleting todo with id:', id);
        
//         const newtodo = todo.filter((todo) => todo.id !== id);
//         if(newtodo){
//         deletePost(todo.id);
//         }
//         setTodo(newtodo);

//     };
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

    // const handleDeleteTodo = (id) => {
    //     const todoDelete = todo.filter((item) => item.id === id);
    //     if (todoDelete) {
    //         deletePost(todoDelete.id);
    //       dispatch({ type: "DELETE_TODO", id: todoDelete.id });
    //     }
    //   };


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