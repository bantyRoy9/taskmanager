export const userAction = (user,submitType) =>async(dispatch) =>{
    if(submitType === "Login"){
        dispatch({type:"USER_LOGIN_SUCCESS",payload:user})
    }else{
        dispatch({type:"USER_REGISTER_REQUEST",payload:user});
    }
}
export const getTaskData = (dispatch) =>{
    dispatch({type:"GET_TASK_REQ"})
    const data = JSON.parse(localStorage.getItem("taskDetails"));
    //console.log(data);
    dispatch({type:"GET_TASK_SUCCESS",payload:data?data:[]});
};

export const taskDetailAction =(detail,isEdit)=>async(dispatch)=>{
    !isEdit && dispatch({type:"ADD_TASK_DETAILS",payload:detail})
    isEdit && dispatch({type:"UPDATE_TASK_DETAILS",payload:detail})
}

export const taskDeleteAction =(id)=>async(dispatch)=>{
    dispatch({type:"DELETE_TASK_DETAILS",payload:id})
}