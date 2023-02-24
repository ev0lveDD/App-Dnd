import React, {useEffect} from "react";
import {Link, Navigate, BrowserRouter as Redirect} from "react-router-dom";
import { redirect } from "react-router-dom";
import './Login.css';

function LoginForm({user, login, loginErrorMessage, setRegistered, auth}) {

    return(
        <div className="Login-Body" onKeyDown={(event) => {if(event.key==="Enter"){login();}}}>
            <h1>Login</h1>
            <div className="Button-Row">
                <input type="text" className="inputText" id="loginEmail" required/>
                <span className="floating-label">Email</span>
            </div>
            <div className="Button-Row">
                <input type="password" className="inputText" id="loginPassword" required/>
                <span className="floating-label">Password</span>
            </div>
            <p className="Error-Message">{loginErrorMessage}</p>
            <button className="Login-Button" onClick={login}>LOG IN</button>
            <p>Not a member yet ?<a onClick={() => setRegistered(false)}> Sign Up</a></p>
            {user && <Navigate to={'/dnd-app/CharacterSelect'}></Navigate>}
        </div>
    );
}

export default LoginForm;