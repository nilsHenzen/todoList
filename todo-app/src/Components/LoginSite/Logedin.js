import Alert from '@mui/material/Alert';

export default function Logedin() {
    return(
        <div className="Logedin">
            <Alert severity="info">You are allready loggedin <a href='http://localhost:3001/TodoList'>back to List</a></Alert>
        </div>
    )
}