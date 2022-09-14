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
                                    <button>x</button>
                                    {task.title}
                                </li>

                            </>
                        ))}
                    </ul>
                </>
                : "no"
            }
        </>
    )
}