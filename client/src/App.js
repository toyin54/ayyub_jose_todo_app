import React , {useState , useReducer , useEffect} from 'react';
import './App.css';
import UserBar from './components/UserBar';
import ListPage from './pages/ListPage';
import appReducer from './reducers/reducers';
import { StateContext , ThemeContext } from './components/contexts';
import { useResource } from 'react-request-hook';
import Header from './components/Header';
import ChangeTheme from './components/ChangeTheme';
function App() {
  const [state , dispatch] = useReducer(appReducer, {
    user:"",
    todo:[],
  })

  const {user , posts} = state;  

  const [theme , setTheme] = useState({
    primaryColor : "orange",
    secondaryColor: "purple",
  })
  // const [posts , setPosts] = useState([intialPosts])

  return (
    <div>
      <StateContext.Provider  value={{state , dispatch}}>
        <ThemeContext.Provider value={theme}>
          <Header text= "Welcome to Todo App"/>
          <UserBar />
          {user && <ListPage/>}
      </ThemeContext.Provider>
    </StateContext.Provider>
    </div>

  );
}

export default App;
