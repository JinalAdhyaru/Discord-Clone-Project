import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter,
  createRoutesFromElements,
  Route, 
  RouterProvider,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import './index.css';
import store from "./store/store";
import LoginScreen from './Screens/LoginScreen';
import RegisterScreen from './Screens/RegisterScreen';
import DashboardScreen from './Screens/Dashboard/DashboardScreen';
import { jwtDecode } from "jwt-decode";
import process from 'process';
window.process = process;

const isTokenValid = () => {
    
    const user = localStorage.getItem("user");
    if(user) {      
        const { token } = JSON.parse(user);
        
        if (token) {
            const decodedToken = jwtDecode(token);
            const currentTime = Date.now() / 1000;
            return decodedToken.exp > currentTime;
        }
    }
    
    return false;

};

const router = createBrowserRouter(
    createRoutesFromElements(

      <Route path="/" element={<App />}>
        
        <Route index={true} path="/" element={isTokenValid() ? (<DashboardScreen />) : (<LoginScreen />)} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/dashboard" element={<DashboardScreen />} />

      </Route>
    )
)

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
);