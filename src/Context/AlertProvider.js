import { Alert, Snackbar } from "@mui/material";
import { createContext, useState } from "react";

export const AlertContext = createContext({});

export default function AlertProvider({ children }) {
    const [open, setOpen] = useState(false);
    const [type, setType] = useState("success");
    const [message, setMessage] = useState("");
    const [duration, setDuration] = useState(3000);
    const [pos, setPos] = useState({ vertical: "top", horizontal: "center" });

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
    };

    const popUp = (
        type,
        message,
        duration = null,
        vertical = "top",
        horizontal = "center"
    ) => {
        setType(type);
        setMessage(message);
        if (duration) setDuration(duration);
        setPos({ vertical: vertical, horizontal: horizontal });
        setOpen(true);
    };

    return (
        <AlertContext.Provider value={{ popUp }}>
            {children}
            <Snackbar
                anchorOrigin={pos}
                open={open}
                autoHideDuration={duration}
                onClose={handleClose}
            >
                <Alert
                    onClose={handleClose}
                    severity={type}
                    sx={{ width: "100%" }}
                >
                    {message}
                </Alert>
            </Snackbar>
        </AlertContext.Provider>
    );
}
