import { Alert } from "@mui/material"

export default function ErrorMessage(message) {
    let messageinfo = "";
    if (message.message === 1) {
        messageinfo = "You must enter a task";
    } else if (message.message === 2) {
        messageinfo = "email must end with: @gmail.com";
    } else if (message.message === 3) {
        messageinfo = "incorrect login";
    }

    return (
        <>
            <Alert severity="error" id="Message">{messageinfo}</Alert>
        </>
    )
}