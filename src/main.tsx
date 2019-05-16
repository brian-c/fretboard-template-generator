import * as ReactDOM from 'react-dom';
import * as React from 'react';
import App from './app';

const appRoot: HTMLElement = document.createElement('div');
document.body.appendChild(appRoot);
ReactDOM.render(<App />, appRoot);
