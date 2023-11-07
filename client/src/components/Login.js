import { useState, useEffect } from "react";
import { useResource } from "react-request-hook";

export default function Login({ dispatchUser }) {
    const [ username, setUsername ] = useState('')
    const [ password, setPassword ] = useState('')
    const [loginFailed, setLoginFailed] = useState(false);


    const [user, login] = useResource((username, password) => ({
        url: "/login",
        method: "post",
        data: { email: username, password },
      }));
 
 
      useEffect(() => {
        if (user) {
          if (user?.data?.user) {
            setLoginFailed(false);
            dispatchUser({ type: "LOGIN", username: user.data.user.email });
          } else {
            setLoginFailed(true);
          }
        }
      }, [user]);

    function handleUsername (e) { 
         setUsername(e.target.value) 
     }
 
     function handlePassword (e) { 
         setPassword(e.target.value) 
     }
 

   return (
    <>
        {loginFailed && (
        <span style={{ color: "red" }}>Invalid username or password</span>
      )
      }
        <form onSubmit={e => { 
            e.preventDefault();
            login(username, password);
            // dispatchUser({ type: "LOGIN", username });
             }}
             >
            <label htmlFor="login-username">Username:</label>
            <input 
                type="text" 
                value={username} 
                onChange={handleUsername} 
                name="login-username" 
                id="login-username" 
            />
            <label 
                htmlFor="login-password"> Password:</label>
            <input
                type="password" 
                name="login-password" 
                id="login-password"
                value={password}
                onChange={handlePassword} />
            <input
                 type="submit" 
                 value="Login" 
                 disabled={username.length === 0} />
        </form>
        </>
    )
}
