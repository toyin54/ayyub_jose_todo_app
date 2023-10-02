import React from "react";

export default function LogOut({user , setUser}){
    return (
       <form onClick={e=> {e.preventDefault() ; setUser('')}}>
        Logged in as: <b>{user}</b>
        <input type = "submit" value = "LogOut"/>
       </form>
    )
}