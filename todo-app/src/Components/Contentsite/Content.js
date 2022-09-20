import { useState, useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import Logout from '../LoginSite/Logout';
import ErrorMessage from '../ErrorMessage';
import SuccesMessage from '../SuccesMessage';

export default function Content() {

    const [status, setStatus] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [get, setGet] = useState(0);
    const [error, setError] = useState(0);
    const [succes, setSucces] = useState(0);

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

        if (newtask === "") {
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
                    setSucces(1);
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
                setGet(get + 1);
                setSucces(2);
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

        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].id.toString() === currentId) {
                let state = false;
                if (tasks[i].completed === true) {
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
    }

    const goToSinglepage = (event) => {
        let currentId = event.currentTarget.parentElement.id;
        window.location = `http://localhost:3001/TodoList/${currentId}`
    }

    return (
        <div className='content'>
            <h2>Todo List</h2>
            <Logout />
            <br />
            <input type="text" id="newtaskField"></input>
            <button onClick={createNewTask}>post</button>
            <br />
            {error === 1 ? <ErrorMessage message={error} /> : <></>}
            {status === true ?
                <>
                    <ul id='list'>
                        {tasks.map((task) => (
                            <li className='listItem' id={task.id} key={task.id}>
                                <button onClick={deleteTask} className='deleteButton'><DeleteIcon /></button>
                                <span id={`title${task.id}`}>{task.title}</span>
                                <button className='edit editbtn' onClick={goToSinglepage}>edit</button>
                                <button className='edit' onClick={updateTask}><SaveIcon /></button>
                                <input className='edit inputFields' id={`input${task.id}`} placeholder='edit...'></input>
                                {task.completed === true ? <button className='edit completed' onClick={change}>✅</button> : <button className='edit completed' onClick={change}>❌</button>}
                            </li>

                        ))}
                    </ul>
                </>
                : ""
            }
            {succes === 1 || succes === 2 || succes === 3 || succes === 4 ? <SuccesMessage message={succes} /> : <></>}
        </div>
    )
}