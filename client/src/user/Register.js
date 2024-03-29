import { useState, useEffect } from "react";
import { useResource } from "react-request-hook";
import "./styles.css";

export default function Register({ dispatchUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");

  const [user, register] = useResource((username, password) => ({
    url: "auth/register",
    method: "post",
    data: { username, password, passwordConfirmation: password },
  }));

  useEffect(() => {
    if (user && user.data) {
      dispatchUser({ type: "REGISTER", username: user.data.username });
    }
  }, [user, dispatchUser]);

  useEffect(() => {
    if (user && user.isLoading === false && (user.data || user.error)) {
      if (user.error) {
        setStatus("Registration failed, please try again later.");
      } else {
        setStatus("Registration successful. You may now login.");
      }
    }
  }, [user]);

  function handleUsername(evt) {
    setUsername(evt.target.value);
  }
  function handlePassword(evt) {
    setPassword(evt.target.value);
  }
  function handlePasswordRepeat(evt) {
    setPasswordRepeat(evt.target.value);
  }

  return (
    <div className="register-container">
      {status && <span className="error-message">{status}</span>}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          register(username, password);
          dispatchUser({ type: "REGISTER", username });
        }}
      >
        <label htmlFor="register-username">Username:</label>
        <input
          type="text"
          name="register-username"
          id="register-username"
          value={username}
          onChange={handleUsername}
        />

        <label htmlFor="register-password">Password:</label>
        <input
          type="password"
          name="register-password"
          id="register-password"
          value={password}
          onChange={handlePassword}
        />

        <label htmlFor="register-password-repeat">Repeat password:</label>
        <input
          type="password"
          name="register-password-repeat"
          id="register-password-repeat"
          value={passwordRepeat}
          onChange={handlePasswordRepeat}
        />

        <input
          type="submit"
          value="Register"
          disabled={
            username.length === 0 ||
            password.length === 0 ||
            password !== passwordRepeat
          }
        />
      </form>
    </div>
  );
}
