import React from "react";
import {Link, Navigate} from "react-router-dom";
import './Login.css';

function RegisterForm({user, register, setRegistered, registerErrorMessage}) {
    return(
        <div className="Login-Body">
            <h1>Register</h1>
            <div className="Button-Row">
                <input type="text" className="inputText" id="registerEmail" required/>
                <span className="floating-label">Email</span>
            </div>
            <div className="Button-Row">
                <input type="password" className="inputText" id="registerPassword" required/>
                <span className="floating-label">Password</span>
            </div>
            <div className="Button-Row">
                <input type="password" className="inputText" id="registerPassword2nd" required/>
                <span className="floating-label">Password</span>
            </div>
            <p className="Error-Message">{registerErrorMessage}</p>
            <button className="Login-Button" onClick={register}>REGISTER</button>
            <p>Already a member ?<a onClick={() => setRegistered(true)}> Sign In</a></p>
            {user && <Navigate to={'/dnd-app/CharacterSelect'}></Navigate>}
        </div>
    );
}

export default RegisterForm;