import React from 'react';
import ReactDOM from 'react-dom';
import Router from './components/Router/router.js';
import './assets/css/index.css';

let destination = document.querySelector("#container")
  
ReactDOM.render(
    <div>
     <Router/>
    </div>,
    destination
);
