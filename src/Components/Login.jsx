import React, {useState} from "react";
import {Link} from "react-router-dom";
import { auth } from "../firebase-config";
import './Login.css';
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { isEmpty } from "@firebase/util";

function Login({user, auth}) {
    
    const [registered, setRegistered] = useState(true);
    const [loginErrorMessage, setLoginErrorMessage] = useState("");
    const [registerErrorMessage, setRegisterErrorMessage] = useState("");

    const logout = async () => {
        await signOut(auth);
      }

    const register = async () => {
        const registerEmail = document.getElementById("registerEmail").value;
        const registerPassword = document.getElementById("registerPassword").value;
        const registerPassword2nd = document.getElementById("registerPassword2nd").value;
        if(registerPassword===registerPassword2nd) {
        try{
            const user = await createUserWithEmailAndPassword(
                auth, 
                registerEmail, 
                registerPassword
                );
            console.log(user);
        }
        catch(error){
            if(registerEmail==="") {
                setRegisterErrorMessage("Please enter your email")
            } else if(registerPassword==="") {
                setRegisterErrorMessage("Please enter your password")
            } else if(registerPassword2nd==="") {
                setRegisterErrorMessage("Please re-enter your password")
            } else if(error.code=="email-already-in-use") {
                setRegisterErrorMessage("Email is already in use")
            } else if(error.code=="auth/weak-password") {
                setRegisterErrorMessage("Password should be at least 6 characters")
            } else if(error.code=="auth/invalid-email") {
                setRegisterErrorMessage("Inavlid email")
            }
            console.log(error.message);
        }} else if(registerPassword!=registerPassword2nd){
            setRegisterErrorMessage("Passwords do not match")
        }
      }
    
      const login = async () => {
        const loginEmail = document.getElementById("loginEmail").value;
        const loginPassword = document.getElementById("loginPassword").value;
        try{
            const user = await signInWithEmailAndPassword(
                auth, 
                loginEmail, 
                loginPassword
                );
            console.log(user);
        }
        catch(error){
            if(loginEmail==="") {
                setLoginErrorMessage("Please provide email")
            } else if(loginPassword==="") {
                setLoginErrorMessage("Please provide password")
            } else if(error.code=="auth/wrong-password"){
                setLoginErrorMessage("Wrong password")
            } else if (error.code=="auth/invalid-email") {
                setLoginErrorMessage("Inavlid email")
            } else if(error.code="user-not-found"){
                setLoginErrorMessage("User not found")
            } 
            console.log(error.message);
        }
      }

    return(
        <div className="Login-Body">
        {registered ? <LoginForm user={user} login={login} loginErrorMessage={loginErrorMessage} setRegistered={setRegistered}/> : <RegisterForm user={user} register={register} registerErrorMessage={registerErrorMessage} setRegistered={setRegistered}/>}
        </div>
    )
}

export default Login;
