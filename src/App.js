import React , {useState} from 'react';
import './App.css';
import UserBar from './components/UserBar';
import ListPage from './pages/ListPage';

function App() {
  
  const [user , setUser] = useState('')
  // const [posts , setPosts] = useState([intialPosts])

  return (
    <div>
      <UserBar user = {user} setUser={ setUser}/>
      {user && <ListPage/>}
   
    </div>

  );
}

export default App;
