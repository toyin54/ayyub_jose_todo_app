import React, { useState , useContext } from "react";
import LogOut from "./LogOut";
import Login from "./Login";
import Register from "./Register";
import { StateContext } from "../contexts";
import Auth from "./Auths";
export default function UserBar(){
    const { state, dispatch: dispatchUser } = useContext(StateContext);
    const { user } = state;
    if (user){
        return <LogOut  />
    }
    else{
        return (
            <>
                {/* <Login dispatchUser = {dispatchUser}/>
                <Register dispatchUser = {dispatchUser}/> */}
                <Auth/>
            </>  
          )
    }
}