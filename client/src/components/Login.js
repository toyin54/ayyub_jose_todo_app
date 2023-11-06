import React, { useState } from 'react'

export default function Login({ dispatchUser }) {
    const [ username, setUsername ] = useState('')
    const [ password, setPassword ] = useState('')
 
 
    function handleUsername (e) { 
         setUsername(e.target.value) 
     }
 
     function handlePassword (e) { 
         setPassword(e.target.value) 
     }
 

   return (
        <form onSubmit={e => { 
            e.preventDefault();
            dispatchUser({ type: "LOGIN", username });
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
    )
}
