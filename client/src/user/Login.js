import { useState, useEffect, useContext } from "react";
import { useResource } from "react-request-hook";
import {StateContext} from "../contexts"

export default function Login({ dispatchUser }) {
    const [username, setUsername] = useState("");
    const [loginFailed, setLoginFailed] = useState(false);
    const [password, setPassword] = useState("");

    // const dispatch = useContext(StateContext)
  
    // const [user, login] = useResource((username, password) => ({
    //   url: "/login",
    //   method: "post",
    //   data: { email: username, password },
    // }));

    const [user, login] = useResource((username, password) => ({
      url: "auth/login",
      method: "post",
      data: { username, password },
    }));
    
    useEffect(() => {
      if (user && user.isLoading === false && (user.data || user.error)) {
        if (user.error) {
          setLoginFailed(true);
        } else {
          setLoginFailed(false);
          dispatchUser({
            type: "LOGIN",
            username: user.data.username,
            access_token: user.data.access_token,
          });
        }
      }
    }, [user]);

    
    // useEffect(() => {
    //   if (user) {
    //     if (user?.data?.user) {
    //       setLoginFailed(true);
    //       dispatchUser({ 
    //         type: "LOGIN", 
    //         username: user.data.username ,
    //         access_token: user.data.access_token,
    //       });
    //     } else {
    //       setLoginFailed(false);
    //     }
    //   }
    // }, [user]);
  
    function handleUsername(evt) {
      setUsername(evt.target.value);
    }
  
    function handlePassword(evt) {
      setPassword(evt.target.value);
    }
  
    return (
      <>
        {loginFailed && (
          <span style={{ color: "red" }}>Invalid username or password</span>
        )}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            // setUser(username);
            login(username, password);
            //dispatchUser({ type: "LOGIN", username });
          }}
        >
          <label htmlFor="login-username">Username:</label>
          <input
            type="text"
            name="login-username"
            id="login-username"
            value={username}
            onChange={handleUsername}
          />
          <label htmlFor="login-password">Password:</label>
          <input
            type="password"
            value={password}
            onChange={handlePassword}
            name="login-username"
            id="login-username"
          />
          ;
          <input type="submit" value="Login" disabled={username.length === 0} />
        </form>
      </>
    );
  }