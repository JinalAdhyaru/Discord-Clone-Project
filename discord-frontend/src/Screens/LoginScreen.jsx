import React, { useState, useEffect } from 'react';
import AuthBox from '../Components/AuthBox';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import InputWithLabel from '../Components/InputWithLabel';
import { validateLoginForm } from '../utils/validators';
import { connect } from "react-redux";
import { getActions } from '../actions/authActions';
import { useNavigate } from 'react-router-dom';

function LoginScreen({ login }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate();

  useEffect(() => { 
    setIsFormValid(validateLoginForm({ email, password }));
  }, [email, password, setIsFormValid]);

  function handleLogin() {
    const userDetails = {
      email,
      password
    };

    login(userDetails, navigate);
  }

  return (
    <AuthBox>

      <Header mainText="Welcome back!" subText="We are happy that you are here with us"/> 

      <InputWithLabel
        value={email}
        setValue={setEmail}
        label="Email"
        type="text"
        placeholder="Enter email address"
      />

      <InputWithLabel
        value={password}
        setValue={setPassword}
        label="Password"
        type="password"
        placeholder="Enter password"
      />

      <Footer 
        formValidMsg="Press to log in!" 
        formInvalidMsg="Enter valid email address and password. Password should contain 6 to 12 characters" 
        historyPath="/register" 
        label="Log In" 
        isFormValid={isFormValid} 
        handleFunction={handleLogin} 
        text="Need an account? " 
        redirectText="Create an account" 
      />

    </AuthBox>
  )
}

const mapActionsToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  }; 
};

export default connect(null, mapActionsToProps)(LoginScreen);