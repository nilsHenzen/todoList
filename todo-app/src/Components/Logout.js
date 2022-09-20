export default function Logout() {
    const logoutprocess = () => {

        console.log("hello")
        fetch('http://localhost:3000/auth/cookie/logout', {
            credentials: 'include',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;'
            },
            body: JSON.stringify({})
        })
            .then((response) => {
                if (response.status === 200) {
                    window.location = "http://localhost:3001/"
                }
            })
    }
    return (
        <>
            <button onClick={logoutprocess}>Logout</button>
        </>
    )
}