import { useState, useEffect, useContext } from "react";
import { useResource } from "react-request-hook";
import { StateContext } from "../contexts";
import "./styles.css";

export default function Auth() {
  const { state, dispatch: dispatchUser } = useContext(StateContext);
  const { user } = state;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [status, setStatus] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");

  const [authUser, authRequest] = useResource((username, password, isRegistering) => ({
    url: isRegistering ? "auth/register" : "auth/login",
    method: "post",
    data: isRegistering
      ? { username, password, passwordConfirmation: password }
      : { username, password },
  }));

  useEffect(() => {
    if (authUser && authUser.data) {
      dispatchUser({ type: isRegistering ? "REGISTER" : "LOGIN", username: authUser.data.username });
    }
  }, [authUser, dispatchUser, isRegistering]);

  useEffect(() => {
    if (authUser && authUser.isLoading === false && (authUser.data || authUser.error)) {
      if (authUser.error) {
        setStatus(`${isRegistering ? "Registration" : "Login"} failed, please try again later.`);
      } else {
        setStatus(`${isRegistering ? "Registration" : "Login"} successful. You may now proceed.`);
      }
    }
  }, [authUser, isRegistering]);

  function handleUsername(evt) {
    setUsername(evt.target.value);
  }

  function handlePassword(evt) {
    setPassword(evt.target.value);
  }

  function handlePasswordRepeat(evt) {
    setPasswordRepeat(evt.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    authRequest(username, password, isRegistering);
    dispatchUser({ type: isRegistering ? "REGISTER" : "LOGIN", username });
  }

  function handleLogout(e) {
    e.preventDefault();
    dispatchUser({ type: "LOGOUT" });
  }

  return (
    <div className="auth-container">
      {user ? (
        <form onSubmit={handleLogout}>
          Logged in as: <b>{user}</b>
          <input type="submit" value="Logout" />
        </form>
      ) : (
        <form onSubmit={handleSubmit}>
          {status && <span className="error-message">{status}</span>}
          <label htmlFor="auth-username">Username:</label>
          <input
            type="text"
            name="auth-username"
            id="auth-username"
            value={username}
            onChange={handleUsername}
          />

          <label htmlFor="auth-password">Password:</label>
          <input
            type="password"
            name="auth-password"
            id="auth-password"
            value={password}
            onChange={handlePassword}
          />

          {isRegistering && (
            <>
              <label htmlFor="auth-password-repeat">Repeat password:</label>
              <input
                type="password"
                name="auth-password-repeat"
                id="auth-password-repeat"
                value={passwordRepeat}
                onChange={handlePasswordRepeat}
              />
            </>
          )}

          <input
            type="submit"
            value={isRegistering ? "Register" : "Login"}
            disabled={
              username.length === 0 ||
              password.length === 0 ||
              (isRegistering && password !== passwordRepeat)
            }
          />

          <button type="button" onClick={() => setIsRegistering(!isRegistering)}>
            {isRegistering ? "Already have an account? Login" : "Don't have an account? Register"}
          </button>
        </form>
      )}
    </div>
  );
}
