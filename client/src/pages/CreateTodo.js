import { useState , useContext } from "react";
import { useResource } from "react-request-hook";
import { StateContext } from "../components/contexts";


export default function CreateTodo() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [description, setDescription] = useState('');

  const { state, dispatch } = useContext(StateContext);
  const { user } = state;

  const [post, createPost] = useResource(({ title, content, author }) => ({
    url: "/posts",
    method: "post",
    data: { title, content, author },
  }));

  function handleTitle(evt) {
    setTitle(evt.target.value);
  }
  function handleContent(evt) {
    setContent(evt.target.value);
  }
  function handleCreate() {
    const newPost = { title, content, author: user };
    createPost(newPost);
    dispatch({ type: "CREATE_POST", ...newPost })
    setTitle('');
    setContent('');
    ;
    //handleAddPost(newPost);
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleCreate();
      }}
    >
      <div>
        Author:
             <b>{user}</b>
      </div>
      <div>
            <label 
                htmlFor="create-title">
                    Title
            </label>
            <input
                type="text"
                value={title}
                onChange={handleTitle}
                name="create-title"
                id="create-title"
            />
      </div>
      <textarea
            value={content} 
            onChange={handleContent} 
       />
      <input 
            type="submit" 
            value="Create" 
        />
    </form>
  );
}