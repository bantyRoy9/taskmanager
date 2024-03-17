import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import { useEffect, useState } from 'react';
import { UserContext } from './Context/userContext';
function App() {
  const [user,setUser] = useState(JSON.parse(localStorage.getItem("user")));
  useEffect(()=>{
    let user = JSON.parse(localStorage.getItem("user"));
    setUser(user)
  },[])
  return (
    <BrowserRouter>
    <UserContext.Provider value = {user}>
      <Routes>
        <Route path='/' Component={Dashboard}/>
        <Route path='/login' Component={Login}/>
      </Routes>
    </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
