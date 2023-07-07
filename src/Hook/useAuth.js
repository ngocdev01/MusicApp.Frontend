import { useContext } from "react";
import { AuthContext } from "../Context/AuthProvider";
import { useNavigate } from "react-router-dom";

function useAuth() {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    function login(loginValue) {
        auth.login(loginValue);
        navigate("/");
        //console.log(user);
    }

    function logout() {
        auth.logout();
        navigate("/");
    }

    return { auth: auth.auth, login, logout };
}

export default useAuth;
