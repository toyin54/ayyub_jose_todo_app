import React, { useState , useContext } from "react";
import {Link } from 'react-router-dom'
import LogOut from "./LogOut";
import Login from "./Login";
import Register from "./Register";
import { StateContext } from "./contexts";
export default function UserBar(){
    const { state, dispatch: dispatchUser } = useContext(StateContext);
    const { user } = state;
  
    

    if (user){
        return <LogOut user={user} dispatchUser={dispatchUser} />
    }
    else{
        return (
            <>
                <Login setUser = {dispatchUser}/>
                <Register setUser = {dispatchUser}/>
            </>  
          )
    }
}