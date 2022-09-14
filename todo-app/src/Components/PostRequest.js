export default function PostRequest() {

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
            })
            .catch((error) => {
                console.error('Error:', error);
            });

    }


    return (
        <>
            <h2>hello world</h2>
            <input type="text" id="newtaskField"></input>
            <button onClick={createNewTask}>post</button>
        </>
    )
}