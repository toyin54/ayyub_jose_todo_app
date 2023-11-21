import { useState, useContext, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useResource } from "react-request-hook";

import { StateContext } from "../contexts";

export default function CreatePost() {
  const [inputTask, setInputTask] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(false);

  const { state, dispatch } = useContext(StateContext);
  const { user } = state;

  const [post, createPost] = useResource(({id, todo, description, author, dateCreated}) => ({
    url: "/post",
    method: "post",
    headers: { Authorization: `${state.user.access_token}` },
    data: { id, todo, description, author, dateCreated},
  }));

  // ensure the newly created post didn't return an error, handle if it did

  const handleAddTodo = () => {
    const newTask = {
        //id: uuidv4(),
        description,
        todo: inputTask,
        // complete:complete,
        // dateCompleted: dateCompleted,
        // dateCreated :dateCreated,
        auhor:state.user,
    };

    // setTodo([...todo,newTask]);
    createPost(newTask);
    // setInputTask('');
    // setDescription('');
    // setChecked(false);
    // setSelectedDate(false);
    // console.log(todo.id)
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
        complete:post.data.complete,
        dateCreated:post.data.post.data.complete,
        dateCompleted: post.data.dateCompleted,
      });
    }
  }, [post]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createPost({ inputTask, description, author: user });
      }}
    >
      <div>
        Author: <b>{user.username}</b>
      </div>
      <div>
        <label htmlFor="create-todo-item">Todo Item:</label>
        <input
          type="text"
          name="create-todo-item"
          id="create-todo-item"
          value={inputTask}
          onChange={(event) => setInputTask(event.target.value)}
        />
      </div>
      <textarea
        value={description}
        onChange={(event) => setInputTask(event.target.value)}
      />
      <input type="submit" value="Create" />
    </form>
  );
}