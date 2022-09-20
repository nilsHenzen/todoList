import { useState } from "react";
import Logedin from "./Loggedin";
import ErrorMessage from "../ErrorMessage";

export default function Login() {
    const [status, setStatus] = useState(false);
    const [error, setError] = useState(0);

    fetch('http://localhost:3000/auth/cookie/status', {
        credentials: 'include'
    })
        .then((response) => {
            if (response.status == 200) {
                setStatus(true);

            } else {
                setStatus(false);
            }
        });

    const loginProcess = () => {
        let email = document.getElementById("User").value;
        let password = document.getElementById("Password").value;
        let controllemail = email.substr(email.length - 10);

        if (controllemail != "@gmail.com") {
            setError(2);
        } else {
            fetch('http://localhost:3000/auth/cookie/login', {
                credentials: 'include',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;'
                },
                body: JSON.stringify({
                    "email": email,
                    "password": password
                })
            })
                .then((response) => {
                    if (response.status === 200) {
                        window.location = "http://localhost:3001/TodoList"
                    } else {
                        setError(3);
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
    }

    return (
        <div className="Loginpage">
            <h2>Login</h2>
            <input id="User" placeholder="email"></input>
            <br />
            <input id="Password" type='password' placeholder="password"></input>
            <br />
            <button id="login" onClick={loginProcess}>login</button>
            {error === 2 || error === 3 ? <ErrorMessage message={error} /> : <></>}
            {status === true ? <Logedin /> : <></>}
        </div>
    )
}