import React from 'react';
import './App.css';
import { Outlet } from 'react-router-dom';
import AlertNotification from './Components/AlertNotification';

function App() {
  return (
    <>
      <Outlet />
      <AlertNotification />
    </>
  );
}

export default App;
