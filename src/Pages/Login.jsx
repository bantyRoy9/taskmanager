import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./login.css";
import { userAction } from "../Redux/actions";
import Input from '../Components/Input'
import { UserContext } from "../Context/userContext";
const Login = () => {
  const navigate = useNavigate(),userContext = useContext(UserContext),
    dispatch = useDispatch(),
    switcherTab = useRef(null),
    signupTab = useRef(null),
    loginTab = useRef(null),
    [user, setUser] = useState({});
  useEffect(()=>{
    userContext && navigate("/")
  },[userContext,navigate]);
  const submitHandler = (e,submitType) => {
    e.preventDefault();
    if(submitType === "Login"){
      let usersList = JSON.parse(localStorage.getItem("userList")) || [];
      usersList = usersList?.filter(el=> (el.email === user.email && el.password === user.password));
      if(!usersList.length){
        alert("Please check user and password!");
        return
      };
    }
    dispatch(userAction(user,submitType));
    submitType !== "Login" && alert("User created successfully. Login again!");
    window.location.href="/"
  };
  
  const changeHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() => {}, []);
  const switchTab = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNormal");
      switcherTab.current.classList.remove("shiftToRight");

      signupTab.current.classList.remove("signupFormNormal");
      loginTab.current.classList.remove("shiftToLeft");
    }
    if (tab === "signup") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNormal");
      loginTab.current.classList.add("shiftToLeft");
      signupTab.current.classList.add("signupFormNormal");
    }
    setUser({})
  };

  return (
    <>
      <div className="col-md-12">
        <div className="loginSignup-box">
          <div className="col-md-12">
            <div className="loginSignup-toggle">
              <div className="text-center pointer" onClick={(e) => switchTab(e, "login")}>Login</div>
              <div className="text-center pointer" onClick={(e) => switchTab(e, "signup")}>Register</div>
            </div>
            <button ref={switcherTab}></button>
          </div>
          <form className="loginForm row" ref={loginTab} onSubmit={(e)=>submitHandler(e,"Login")}>
            <div className="col-md-12">
                <Input
                    label="Email"
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    onChange={changeHandler}
                    required={true}
                    className="form-control padPlaceHolder"
                    leftIcon="fa-solid fa-envelope"
                    value={user?.email}
                    errorMsg="Email required!"
                    pattern={/^([\w-!#$%&.]+@([\w-]+\.)+[\w-]{1,4})?$/}
                />
              </div>
            <div className="col-md-12">
                <Input
                  label="Password"
                  placeholder="Enter your password"  
                  type="password"
                  className="form-control"
                  name="password"
                  onChange={changeHandler}
                  required={true}
                  leftIcon="fa-solid fa-lock"
                  value={user?.password}
                  errorMsg="Password Required!"
                  pattern={/^[ A-Za-z0-9_@./#&+-].{7,}$/}
                />
            </div>
            <div className="col-md-12">
                <button type="submit" className="btn btn-primary col-md-12">Login</button>
            </div>
          </form>
          <form className="signupForm" ref={signupTab} onSubmit={(e)=>submitHandler(e)}>
            <div className="col-md-12">
              <Input
                label="Full Name"
                placeholder="Enter your full name"
                className="form-control"
                type="text"
                name="name"
                onChange={changeHandler}
                leftIcon="fa-solid fa-user"
                value={user?.name}
                required
              />
            </div>
            <div className="col-md-12">
              <Input
                label="Email"
                placeholder="example@gmail.com"
                className="form-control"
                type="email"
                name="email"
                onChange={changeHandler}
                leftIcon="fa-solid fa-envelope"
                value={user?.email}
                errorMsg="Email required!"
                pattern={/^([\w-!#$%&.]+@([\w-]+\.)+[\w-]{1,4})?$/}
                required
              />
            </div>
            <div className="col-md-12">
              <Input
                label="Choose Password"
                className="form-control"
                type="password"
                name="password"
                placeholder="Minimum 8 characters"
                onChange={changeHandler}
                required={true}
                leftIcon="fa-solid fa-lock"
                value={user?.password}
                errorMsg="Password Required!"
                pattern={/^[ A-Za-z0-9_@./#&+-].{7,}$/}
              />
            </div>
            <div className="col-md-12">
                <button type="submit" className="btn btn-primary col-md-12">Sign up</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
