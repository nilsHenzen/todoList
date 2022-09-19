import { useState, useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';

export default function GetRequest() {

    const [status, setStatus] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [get, setGet] = useState(0);

    useEffect(() => {
        fetch('http://localhost:3000/tasks')
            .then((response) => response.json())
            .then((data) => {
                setStatus(true);
                setTasks(data);
            });
    }, [get]);


    const createNewTask = () => {

        let newtask = document.getElementById("newtaskField").value;
        let task = { title: newtask }

        fetch('http://localhost:3000/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(task)
        })

            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
                setGet(get + 1)
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    const deleteTask = (event) => {
        let currentId = event.currentTarget.parentElement.id;

        fetch(`http://localhost:3000/task/${currentId}`, {
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

        for (let i = 0; i < tasks.lenght; i++) {
            if (tasks.id === currentId) {
                if (tasks.completed == false) {
                    currentState = false;
                } else {
                    currentState = true;
                }
            }
        }

        fetch(`http://localhost:3000/tasks`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;'
            },
            body: JSON.stringify({
                "id": currentId,
                "title": inputValue,
                "completed": currentState
            })
        })

            .then((response) => response.json())
            .then((data) => { setGet(get + 1) })
            .catch((error) => {
                console.error('Error:', error);
            });

    }

    return (
        <>
            <h2>Todo List</h2>
            <input type="text" id="newtaskField"></input>
            <button onClick={createNewTask}>post</button>
            <br />
            {status == true ?
                <>
                    <ul id='list'>
                        {tasks.map((task) => (
                            <>
                                <li className='listItem' id={task.id}>
                                    <button onClick={deleteTask} className='deleteButton'><DeleteIcon /></button>
                                    {task.title}
                                    <input className='edit' id={`input${task.id}`}></input>
                                    <button className='edit' onClick={updateTask}>save</button>
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