import { Alert } from "@mui/material"

export default function NotLoggedIn() {
    return (
        <div className="notloggedin">
            <Alert severity="info">You are not loggedin Please go to the login site <a href='http://localhost:3001/'> back to login</a></Alert>
        </div>
    )
}