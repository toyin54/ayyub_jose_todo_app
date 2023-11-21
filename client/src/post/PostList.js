import { useContext } from "react";


import { StateContext } from "../contexts";

export default function PostList() {
  const { state } = useContext(StateContext);
  const { posts } = state;
  return (
    <div class="list">
    <ul>
         {/* { posts.map((todo) => (
             
             <li className="task" key={todo.id}>
                 <strong>{todo.todo}</strong>
                 
                 <p>{todo.description}</p>
                 <p>Complete:  </p>
                 <p>Created: { todo.dateCreated}</p>
                 <p>Finished: {}</p>
                
             </li>
         ))} */}
     </ul>
</div>
  );
}