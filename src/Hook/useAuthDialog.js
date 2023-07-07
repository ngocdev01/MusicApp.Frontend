import { DialogContent } from "@mui/material";
import { useContext } from "react";
import { DialogContext } from "../Context/AuthProvider";

function useAuthDialog() {
    const { openModal, setOpenModal } = useContext(DialogContext);
    return { openModal, setOpenModal };
}

export default useAuthDialog;
