import { useContext } from "react";
import { AlertContext } from "../Context/AlertProvider";

export default function useAlert()
{
    /**@type {{ popUp: (type: any, message: any, duration?: null) => void }}*/
    const alert = useContext(AlertContext)
    return alert;
}