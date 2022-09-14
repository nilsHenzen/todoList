import { useState } from 'react';

export default function GetRequest() {

    const [status, setStatus] = useState(false);
    const [tasks, setTasks] = useState([]);


    const getRequest = () => {

        fetch('http://localhost:3000/tasks')
            .then((response) => response.json())
            .then((data) => {
                setStatus(true);
                setTasks(data);
            });

    }

    const deleteTask = (event) => {
        let currentId = event.currentTarget.id;

        fetch(`http://localhost:3000/task/${currentId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify("")
        })

            .then((response) => response.json())
            .then((data) => { })
            .catch((error) => {
                console.error('Error:', error);
            });

        getRequest()

    }

    return (
        <>
            <br />
            <button onClick={getRequest}>get</button>
            {status == true ?
                <>
                    <ul>
                        {tasks.map((task) => (
                            <>
                                <li>
                                    <button id={task.id} onClick={deleteTask}>x</button>
                                    {task.title}
                                </li>

                            </>
                        ))}
                    </ul>
                </>
                : ""
            }
        </>
    )
}