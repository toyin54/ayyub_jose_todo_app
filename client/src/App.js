import React , {useState , useReducer , useEffect} from 'react';
import './App.css';

import Header from './components/Header';
import UserBar from './components/UserBar';
import ListPage from './pages/ListPage';
import CreateTodo from './pages/CreateTodo';
import TodoList from './pages/TodoList';
import Todo from './pages/Todo';

import appReducer from './reducers/reducers';
import { StateContext , ThemeContext } from './components/contexts';
import { useResource } from 'react-request-hook';


import ChangeTheme from './components/ChangeTheme';


function App() {
  const [postResponse, getPosts] = useResource(() => ({
    url: "/posts",
    method: "get",
  }));


  const [delpost, deletePost] = useResource((id) => ({
    url: `/posts/${id}`,
    method: 'delete',
  }));



  useEffect(getPosts, []);

  useEffect(() => {
    if (postResponse && postResponse.data) {
      dispatch({ type: "FETCH_POSTS", posts: postResponse.data.reverse() });
    }
  }, [postResponse]);

  console.log(postResponse)
  const [theme , setTheme] = useState({
    primaryColor: "orange",
    secondaryColor: "purple",
  })

  const [ state , dispatch] = useReducer(appReducer, {
    user: "",
    todos: [],
  })

  const {user , todos} = state;

  useEffect(() => {
    if (user) {
      document.title = `${user}'s Todos`;
    } else {
      document.title = "Todos";
    }
  }, [user]);

  const handleAddTodo = (newTodo) => {
    dispatch({ type: "CREATE_TODO", ...newTodo });
  };
  const handleDeleteTodo = (todos) => {
    dispatch({ type: "DELETE_TODO", todos });
  };
  const handleToggleTodo = (id) => {
    dispatch({ type: "TOGGLE_TODO", id });
  };

  let content;
  if (state.user) {
    content = (
      <>
        <CreateTodo handleAddTodo={handleAddTodo} />
        <TodoList
          todos={todos}
          handleAddTodo={handleAddTodo}
          handleDeleteTodo={handleDeleteTodo}
          handleToggleTodo={handleToggleTodo}
        />
      </>
    );
  }


  return (
    <div>
      <StateContext.Provider value={{state , dispatch}}>
        <ThemeContext.Provider value={theme}>
        <Header text="My Todo App"/>
        <ChangeTheme theme={theme} setTheme={setTheme}/>
          <UserBar />
          {/* {content} */}
          {user && <ListPage/> }
        </ThemeContext.Provider>
      </StateContext.Provider>
    </div>
  );
}

export default App;
