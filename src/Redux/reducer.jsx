export const userReducer = (initialState = {},action) => {
  switch (action.type) {
    case "USER_REGISTER_REQUEST":
    let users = JSON.parse(localStorage.getItem("userList")) || [];  
    localStorage.setItem("userList",JSON.stringify([...users,action.payload]));
    return {
      user:action.payload
    };
    case "USER_LOGIN_SUCCESS":
      localStorage.setItem("user",JSON.stringify(action.payload))
      return {
        user: action.payload
      };
    default:
      return initialState;
  }
};

export const taskReducer = (initialState=[], action) => {
  switch (action.type) {
    case "GET_TASK_SUCCESS":
      return {
        taskData: action.payload,
      };
    case "ADD_TASK_DETAILS":
        action.payload = [action.payload,...initialState.taskData]
        localStorage.setItem("taskDetails",JSON.stringify(action.payload))
      return {
        taskData: action.payload
      };
    case "DELETE_TASK_DETAILS":
        action.payload = initialState.taskData.filter(el=> el.id !== action.payload); 
        localStorage.setItem("taskDetails",JSON.stringify(action.payload));
      return {
        taskData: action.payload
      };
    case "UPDATE_TASK_DETAILS" :
      let updatedData =[];  
      initialState.taskData.forEach(el=> {
        if(el.id === action.payload.id){ 
          el=action.payload;
        }
        updatedData.push(el)
      })
      localStorage.setItem("taskDetails",JSON.stringify(updatedData));
      return{
        taskData: updatedData
      }
    default:
      return initialState;
  }
};
