import React, { useState , useEffect  } from 'react'
import { useResource } from 'react-request-hook';

export default function Register({ dispatchUser }) {

      const [user , register] =useResource((username, password)=> ({
            url: "/users",
            method: "post",
            data: {email: username , password},
      }))

      useEffect(() => {
            if (user && user.data) {
              dispatchUser({ type: "REGISTER", username: user.data.user.email });
            }
          }, [user, dispatchUser]);

//     const [ formData, setFormData ] = useState({
//        username: "",
//        password: "", 
//        passwordRepeat: ""
//    })

      const [username , setUsername] = useState("")
      const [password , setUPass] = useState("")
      const [passRepeat , setPassRepeat] = useState("")

      function userHandle(e){
            setUsername(e.target.value)
      }
      function passHandle(e){
            setUPass(e.target.value)
      }
      function passRepeatHandle(e){
            setPassRepeat(e.target.value)
      }

return (
        <form onSubmit={e => { e.preventDefault(); 
            dispatchUser({ type: "REGISTER", username }); }}
            >
          <label 
                htmlFor="register-username">Username:</label>
          <input 
  s              type="text" 
                value={username} 
                onChange={userHandle}
                 name="register-username"
                  id="register-username" />
          <label 
                htmlFor="register-password">Password:</label>
          <input 
                type="password" 
                name="register-password" 
                id="register-password" 
                value={password} 
                onChange={passHandle} />
          <label 
                htmlFor="register-password-repeat">Repeat password:</label>
          <input 
                type="password" 
                name="register-password-repeat" 
                id="register-password-repeat" 
                value={passRepeat} 
                 onChange={passRepeatHandle} />
        <input 
                type="submit" 
                value="Register" 
                disabled={
                    username.length === 0 || 
                    password.length === 0 || 
                    password !== passRepeat} 
        />
        </form>
    )
}


