// Todo.js
import { useState } from "react";
import { useContext } from "react";
import { ThemeContext } from "../contexts";

export default function Todo({ id, title, description, author, dateCreated, timeCompleted, completed: initialValue, toggleTodo }) {
  const { secondaryColor } = useContext(ThemeContext);
  const [completed, setCompleted] = useState(initialValue);
  const [dateCompleted, setDateCompleted] = useState(timeCompleted || null);

  const handleToggleComplete = () => {
    setCompleted(!completed);
    if (!completed) {
      setDateCompleted(Date.now());
    } else {
      setDateCompleted(null);
    }
    toggleTodo(id);
  };

  return (
    <div>
      <h3 style={{ color: secondaryColor }}>{title}</h3>
      <p><b>{description}</b></p>
      <br />
      <p>
        Written by <b>{author}</b>
      </p>
      <div>
        <p>Date Created: {new Date(dateCreated).toLocaleString()}</p>
      </div>
      <label> Completed </label>
      <button onClick={handleToggleComplete}>
        {completed ? "Incomplete" : "Done"}
      </button>
      {dateCompleted && (
        <p>Date Completed: {new Date(dateCompleted).toLocaleString()}</p>
      )}
    </div>
  );
}