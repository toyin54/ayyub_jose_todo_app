import React , {useState , useReducer , useEffect} from 'react';
import './App.css';

import Header from './components/Header';
import UserBar from './components/UserBar';
import ListPage from './pages/ListPage';

import appReducer from './reducers/reducers';
import { StateContext , ThemeContext } from './components/contexts';
import { useResource } from 'react-request-hook';


import ChangeTheme from './components/ChangeTheme';
function App() {
  const [theme , setTheme] = useState({
    primaryColor: "orange",
    secondaryColor: "purple",
  })

  const [ state , dispatch] = useReducer(appReducer, {
    user: "",
    posts: [],
  })

  const {user , posts} = state;

  return (
    <div>
      <StateContext.Provider value={{state , dispatch}}>
        <ThemeContext.Provider value={theme}>
        <Header text="My Todo App"/>
        <ChangeTheme theme={theme} setTheme={setTheme}/>
          <UserBar />
          {user && <ListPage/> }
        </ThemeContext.Provider>
      </StateContext.Provider>
    </div>
  );
}

export default App;
