import { Alert } from "@mui/material";
export default function SuccesMessage(message) {
    let messageinfo = "";

    if (message.message === 1) {
        messageinfo = "created new element"
    } else if (message.message === 2) {
        messageinfo = "deleted task"
    } else if (message.message === 3) {
        messageinfo = "updated task"
    } else if (message.message === 4) {
        messageinfo = "updated task status"
    }
    return (
        <>
            <Alert severity="success" id="Message">{messageinfo}</Alert>
        </>
    )
}