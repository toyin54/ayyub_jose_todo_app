import React , {useState , useReducer , useEffect} from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import UserBar from './components/UserBar';
import ListPage from './pages/ListPage';
import CreateTodo from './pages/CreateTodo';
import TodoList from './pages/TodoList';
import Todo from './pages/Todo';
import Layout from './components/LayOut';

import HomePage from './pages/HomePage';
import appReducer from './reducers/reducers';
import { StateContext , ThemeContext } from './components/contexts';
import { useResource } from 'react-request-hook';


import ChangeTheme from './components/ChangeTheme';


function App() {
  const [postResponse, getPosts] = useResource(() => ({
    url: "/posts",
    method: "get",
  }));


  const [delpost, deletePost] = useResource(({id}) => ({
    url: '/posts/${id}',
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





  return (
    <div>
      <StateContext.Provider value={{ state, dispatch }}>
        <ThemeContext.Provider value={theme}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
              </Route>
              {/* <Route path="/post" element={<Layout />}>
                <Route path="/post/create" element={<CreatePost />} />
                <Route path="/post/:id" element={<PostPage />} />
              </Route> */}
            </Routes>
          </BrowserRouter>
        </ThemeContext.Provider>
      </StateContext.Provider>
    </div>
  );
}
  // return (
  //   <div>
  //     <StateContext.Provider value={{state , dispatch}}>
  //       <ThemeContext.Provider value={theme}>
  //       <BrowserRouter>
  //       <Routes>
    
        
  //       <Route path = '/' element = {<Header text="My Todo App"/>} /> 
  //       <ChangeTheme theme={theme} setTheme={setTheme}/>
  //         <UserBar />
  //         {/* {content} */}
  //         {user && <ListPage/> }
  //         </Routes>
  //         </BrowserRouter>
  //       </ThemeContext.Provider>
  //     </StateContext.Provider>
  //   </div>
  // );

export default App;
