import React , {useState , useReducer , useEffect} from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css’
import {Container, Row, Col} from 'react-bootstrap'

import TodoList from './post/TodoList';
import CreatePost from './post/CreatePost';
import ListPage from './post/ListPage';


import Layout from './pages/LayOut';

import HomePage from './pages/HomePage';
import appReducer from './reducers/reducers';
import { StateContext , ThemeContext } from './contexts';



function App() {
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
              <Route path="/post" element={<Layout />}>
                <Route index element={<ListPage />} />
                {/* <Route path="/post/:id" element={<TodoPage />} /> */}
              </Route>
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
