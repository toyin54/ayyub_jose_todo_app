/*
Reducer functions for 
LOGIN
REGISTER
LOGOUT
*/
function userReducer(state , action){
    switch(action.type){
        case "LOGIN":
        case "REGISTER":
            return action.userName;
        case "LOGOUT":
            return "";
        default:
            return state
    }
}
/*
Reducer functions for 
CREATE_TODO
DELETE_TODO
TOGGLE_TODO
*/
function todoReducer(state , action){
    switch (action.type){
        case "CREATE_TODO":
                const newTask = {
                    id: action.id,
                    description : action.description,
                    todo: action.todo,
                    complete: action.complete,
                    dateCompleted : action.dateCompleted,
                    dateCreated : action.dateCreated

                };
                return[...state, newTask]
        case "DELETE_TODO":
                return [...state, state.todo.filter((todo) => todo.id !== action.id)]
        case "TOGGLE_TODO":
            return [...state , state.todo.map((todo) => 
                todo.id === action.dateCompleted)]
        default:
            return state;
    }
}



export default function appReducer(state, action) {
  return {
    user: userReducer(state.user, action),
    posts: todoReducer(state.posts, action),
  };
}
