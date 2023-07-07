import { useLocation } from "react-router-dom";

export default function Debug({children})
{
    const location = useLocation();
    return(<>{children}{console.log(location.pathname)}</>)
}