import React, { useState } from "react";
import {Link } from 'react-router-dom'
import LogOut from "./LogOut";
import Login from "./Login";
import Register from "./Register";
export default function UserBar({user, setUser}){
    
    
    if (user){
        return <LogOut user = {user} setUser = {setUser}/>

    }
    else{
        return (
            <>
                <Login setUser = {setUser}/>
                <Register setUser = {setUser}/>
            </>  
          )
    }
}