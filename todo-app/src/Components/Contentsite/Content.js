import { useState, useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import Logout from '../LoginSite/Logout';
import ErrorMessage from '../ErrorMessage';

export default function Content() {

    const [status, setStatus] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [get, setGet] = useState(0);
    const [error, setError] = useState(0);

    useEffect(() => {
        fetch('http://localhost:3000/auth/cookie/tasks', {
            credentials: 'include'
        })
            .then((response) => response.json())
            .then((data) => {
                setStatus(true);
                setTasks(data);
            });



    }, [get]);


    const createNewTask = () => {

        let newtask = document.getElementById("newtaskField").value;
        let task = { title: newtask }

        if (newtask == "") {
            setError(1);
        } else {
            fetch('http://localhost:3000/auth/cookie/tasks', {
                credentials: 'include',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(task)
            })

                .then((response) => response.json())
                .then((data) => {
                    setGet(get + 1);
                    setError(0);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
    }

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
                setGet(get + 1)

                let messageField = document.getElementById("messages");
                messageField.innerHTML = "succesfully deleted";
            })
            .catch((error) => {
                console.error('Error:', error);
            });

    }

    const updateTask = (event) => {
        let currentId = event.currentTarget.parentElement.id;
        let inputValue = document.getElementById("input" + currentId).value;
        let currentState = false;

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
            .then((data) => { setGet(get + 1) })
            .catch((error) => {
                console.error('Error:', error);
            });

    }

    const change = (event) => {
        let currentId = event.currentTarget.parentElement.id;

        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].id == currentId) {
                let state = false;
                if (tasks[i].completed == true) {
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
                    .then((data) => { setGet(get + 1) })
                    .catch((error) => {
                        console.error('Error:', error);
                    });



            }
        }
    }


    return (
        <>
            <h2>Todo List</h2>
            <Logout />
            <input type="text" id="newtaskField"></input>
            <button onClick={createNewTask}>post</button>
            <br />
            {error === 1 ? <ErrorMessage message={error}/> : <></>}
            {status === true ?
                <>
                    <ul id='list'>
                        {tasks.map((task) => (
                            <>
                                <li className='listItem' id={task.id}>
                                    <button onClick={deleteTask} className='deleteButton'><DeleteIcon /></button>
                                    <span id={`title${task.id}`}>{task.title}</span>
                                    <button className='edit' onClick={updateTask}><SaveIcon /></button>
                                    <input className='edit inputFields' id={`input${task.id}`} placeholder='edit...'></input>
                                    {task.completed === true ? <button className='edit completed' onClick={change}>✅</button> : <button className='edit completed' onClick={change}>❌</button>}
                                </li>

                            </>
                        ))}
                    </ul>
                </>
                : ""
            }
            <div id='messages'></div>
        </>
    )
}