import ReactDOM from 'react-dom';
import React from 'react';
import App from './app';

const appRoot = document.createElement('div');
document.body.appendChild(appRoot);
ReactDOM.render(<App />, appRoot);
