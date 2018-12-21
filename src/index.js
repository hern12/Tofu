import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import AppRouter from './router'
import { BrowserRouter } from 'react-router-dom';
import firebase from 'firebase';

let config = {
    apiKey: "AIzaSyBYexSgGHtA99cQimKqWiHeBXqCineu-68",
    authDomain: "tofu-51c07.firebaseapp.com",
    databaseURL: "https://tofu-51c07.firebaseio.com",
    projectId: "tofu-51c07",
    storageBucket: "tofu-51c07.appspot.com",
    messagingSenderId: "165077986550"
}

firebase.initializeApp(config)

ReactDOM.render(
<BrowserRouter>
    <AppRouter />
</BrowserRouter>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
