import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

export default function Confirm({ open, content, onConfirm, onAbort }) {
    return (
        <Dialog open={open}>
            <DialogTitle>{"Confirm"}</DialogTitle>
            <DialogContent>
                <DialogContentText>{content}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onAbort} autoFocus>
                    Cancel
                </Button>
                <Button onClick={onConfirm}>Ok</Button>
            </DialogActions>
        </Dialog>
    );
}
