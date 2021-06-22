import React from 'react';
import ReactDOM from 'react-dom';
import 'styles/styles.scss';
import reportWebVitals from './reportWebVitals';
import { Router } from './router/Router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
require('dotenv').config();

ReactDOM.render(
  <React.StrictMode>
    <Router />
    <ToastContainer 
      position="bottom-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      closeOnClick={false} 
      closeButton={true} 
    />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
