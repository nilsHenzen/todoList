import { useState } from "react";
import Logedin from "./Logedin";

export default function Login() {
    const [status, setStatus] = useState(false)

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
        let username = document.getElementById("User").value;
        let password = document.getElementById("Password").value;

        fetch('http://localhost:3000/auth/cookie/login', {
            credentials: 'include',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;'
            },
            body: JSON.stringify({
                "email": username,
                "password": password
            })
        })
            .then((response) => {
                if (response.status === 200) {
                    window.location = "http://localhost:3001/TodoList"
                } else {
                    alert("inncorrect login")
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });

    }

    return (
        <div className="Loginpage">
            <h2>Login</h2>
            <input id="User" placeholder="user name"></input>
            <br />
            <input id="Password" type='password' placeholder="password"></input>
            <br />
            <button id="login" onClick={loginProcess}>login</button>

            {status === true ? <Logedin /> : <></>}
        </div>
    )
}