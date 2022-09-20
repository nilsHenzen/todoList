import { useState, useEffect } from "react";
import NotLoggedIn from './Contentsite/NotLoggedIn.js'
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import SuccesMessage from './SuccesMessage';
import { Alert } from "@mui/material";

export default function SinglePage() {
    let url = window.location.pathname;
    let id = url.substring(10);

    const [get, setGet] = useState(0);
    const [loggedin, setLoggedin] = useState(false);
    const [task, setTask] = useState([]);
    const [succes, setSucces] = useState(0);
    const [error, setError] = useState(0);

    useEffect(() => {
        fetch('http://localhost:3000/auth/cookie/status', {
            credentials: 'include'
        })
            .then((response) => {
                if (response.status === 200) {

                    fetch(`http://localhost:3000/auth/cookie/task/${id}`, {
                        credentials: 'include'
                    })
                        .then((response) => response.json())
                        .then((data) => {
                            if (data.statusCode === 404) {
                                setError(1);
                            } else {
                                setTask(data);
                                setError(0);
                            }
                        });
                    setLoggedin(true);
                } else {
                    setLoggedin(false);
                }
            })
    },[get]);

    const deleteTask = (event) => {
        let currentId = event.currentTarget.parentElement.id;

        fetch(`http://localhost:3000/auth/cookie/task/${currentId}`, {
            credentials: 'include',
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify("")
        })

            .then((response) => response.json())
            .then((data) => {
                setGet(get + 1);
                setSucces(2);
                window.location = "http://localhost:3001/TodoList";
            })
            .catch((error) => {
                console.error('Error:', error);
            });

    }

    const updateTask = (event) => {
        let currentId = event.currentTarget.parentElement.id;
        let inputValue = document.getElementById("input" + currentId).value;

        fetch(`http://localhost:3000/auth/cookie/tasks`, {
            credentials: 'include',
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;'
            },
            body: JSON.stringify({
                "id": currentId,
                "title": inputValue,
                "completed": false
            })
        })

            .then((response) => response.json())
            .then((data) => {
                setGet(get + 1);
                setSucces(3);
            })
            .catch((error) => {
                console.error('Error:', error);
            });

    }

    const change = (event) => {
        let currentId = event.currentTarget.parentElement.id;

        if (task.id.toString() === currentId) {
            let state = false;
            if (task.completed === true) {
                state = false;
            } else {
                state = true;
            }

            let currentId = event.currentTarget.parentElement.id;
            let inputValue = document.getElementById("title" + currentId).innerHTML;

            fetch(`http://localhost:3000/auth/cookie/tasks`, {
                credentials: 'include',
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json;'
                },
                body: JSON.stringify({
                    "id": currentId,
                    "title": inputValue,
                    "completed": state
                })
            })

                .then((response) => response.json())
                .then((data) => {
                    setGet(get + 1);
                    setSucces(4);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });



        }
    }

    const backToList = () => {
        window.location = "http://localhost:3001/TodoList";
    }

    return (
        <>
            {loggedin === true ?
                <>
                    {error === 1 ? <Alert severity="error" id="Message">This route does not exist <a href="http://localhost:3001/TodoList">back to list</a></Alert>:
                        <ul id='list'>
                            <li className='listItem' id={task.id} key={task.id}>
                                <button onClick={deleteTask} className='deleteButton'><DeleteIcon /></button>
                                <span id={`title${task.id}`}>{task.title}</span>
                                <button className='edit editbtn' onClick={backToList}>back to list</button>
                                <button className='edit' onClick={updateTask}><SaveIcon /></button>
                                <input className='edit inputFields' id={`input${task.id}`} placeholder='edit...'></input>
                                {task.completed === true ? <button className='edit completed' onClick={change}>✅</button> : <button className='edit completed' onClick={change}>❌</button>}
                            </li>
                        </ul>
                    }
                </>
                :
                <NotLoggedIn />
            }

            {succes === 1 || succes === 2 || succes === 3 || succes === 4 ? <SuccesMessage message={succes} /> : <></>}
        </>
    )
}