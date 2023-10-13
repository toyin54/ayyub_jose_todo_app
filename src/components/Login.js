import React, { useState } from 'react'

export default function Login({ dispatchUser }) {
   const [ username, setUsername ] = useState('')

   function handleUsername (e) { 
        setUsername(e.target.value) 
    }

   return (
        <form onSubmit={e => { 
            e.preventDefault();
             setUser(username); 
             }}
             >
            <label htmlFor="login-username">Usernaqe3eme:</label>
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
                 id="login-password" />
            <input
                 type="submit" 
                 value="Login" 
                 disabled={username.length === 0} />
        </form>
    )
}
