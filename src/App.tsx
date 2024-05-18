import React from 'react';
import logo from './logo.svg';
import './App.css';
import {RouterProvider, createBrowserRouter, BrowserRouter} from "react-router-dom"

import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Dashboard from './pages/Dashboard/Dashboard';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/dashboard",
    element: <Dashboard />
  },
])
function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
