import React , {useState , useReducer , useEffect} from 'react';
import './App.css';
import UserBar from './components/UserBar';
import ListPage from './pages/ListPage';
import appReducer from './reducers/reducers';
import { StateContext } from './components/contexts';

function App() {
  const [state , dispatch] = useReducer(appReducer, {
    user:"",
    posts:[],
  })

  const {user , posts} = state;  

  // const [posts , setPosts] = useState([intialPosts])

  return (
    <div>
      <StateContext.Provider  value={{state , dispatch}}>
      <UserBar />
      {user && <ListPage/>}
      </StateContext.Provider>
    </div>

  );
}

export default App;
