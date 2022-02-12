import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "./style.scss";
import LoginForm from "./loginForm";
import { selectAuth, logout } from "../../store/auth";

const FormContainer = () => {
  const dispatch = useDispatch();
  const { loggedIn, user } = useSelector(selectAuth);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className='Container'>
      <div className='ContainerHeader'>
        {loggedIn ? (
          <h1>You are logged in as {user.email}!</h1>
        ) : (
          <h1>LoginForm</h1>
        )}
      </div>
      {loggedIn ? (
        <button className='logout' onClick={handleLogout} type='submit'>
          Log Out
        </button>
      ) : (
        <LoginForm />
      )}
    </div>
  );
};
export default FormContainer;
