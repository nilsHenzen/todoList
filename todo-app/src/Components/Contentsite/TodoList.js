import { useState, useEffect } from 'react';
import Content from './Content';
import NotLoggedIn from './NotLoggedIn';

export default function TodoList() {

    const [get, setGet] = useState(0);
    const [loggedin, setLoggedin] = useState(false);

    useEffect(() => {
        fetch('http://localhost:3000/auth/cookie/status', {
            credentials: 'include'
        })
            .then((response) => {
                if (response.status === 200) {
                    setLoggedin(true)
                } else {
                    setLoggedin(false)
                }
            })
    }, [get]);

    return (
        <>
            {loggedin === true ? <Content /> : <NotLoggedIn />}
        </>
    )
}