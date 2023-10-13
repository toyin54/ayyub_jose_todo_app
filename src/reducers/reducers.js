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

function postReducer(state , action){
    switch (action.type){
     case "CREATE_POST":
            const newTask = {
                id: action.id,
                description : action.description,
                todo: action.todo,
                complete: action.complete,
                dateCompleted : action.dateCompleted,
                dateCreated : action.dateCreated

            };
            return[...state, newTask]
    default:
        return state;
    }
}

export default function appReducer(state, action) {
  return {
    user: userReducer(state.user, action),
    posts: postReducer(state.posts, action),
  };
}
