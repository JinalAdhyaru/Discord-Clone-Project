import React, { useState, useEffect } from 'react';
import AuthBox from '../Components/AuthBox';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import InputWithLabel from '../Components/InputWithLabel';
import { validateRegisterForm } from '../utils/validators';
import { connect } from "react-redux";
import { getActions } from '../actions/authActions';
import { useNavigate } from 'react-router-dom';

function RegisterScreen({ register }) {

  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate();

  useEffect(() => { 
    setIsFormValid(validateRegisterForm({ email, password, username }));
  }, [email, password, username, setIsFormValid]);

  function handleRegister() {
    const userDetails = {
      email,
      password,
      username
    }

    register(userDetails, navigate);
  }

  return (
    <AuthBox>

      <Header mainText="Create an account" /> 

      <InputWithLabel
        value={email}
        setValue={setEmail}
        label="Email address"
        type="text"
        placeholder="Enter email address"
      />

      <InputWithLabel
        value={username}
        setValue={setUsername}
        label="Username"
        type="text"
        placeholder="Enter username"
      />

      <InputWithLabel
        value={password}
        setValue={setPassword}
        label="Password"
        type="password"
        placeholder="Enter password"
      />

      <Footer 
        formValidMsg="Press to register!" 
        formInvalidMsg="Enter valid username, email address and password. Username should contain 3 to 12 characters and password should contain 6 to 12 characters." 
        historyPath="/login" 
        label="Register" 
        isFormValid={isFormValid} 
        handleFunction={handleRegister} 
        text="Already have an account? " 
        redirectText="Log In" 
      />

    </AuthBox>
  )
}

const mapActionsToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  }; 
};

export default connect(null, mapActionsToProps)(RegisterScreen);