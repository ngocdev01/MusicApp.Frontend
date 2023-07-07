import { createContext, useMemo } from "react";
import { useLocalStorage } from "../Hook/useLocalStorage";
import ModalContextProvider from "./ModalContext";

export const AuthContext = createContext({});
export const DialogContext = createContext({});

function AuthProvider({ children }) {
    const [auth, setAuth] = useLocalStorage("auth", null);

    const login = async (data) => {
        await setAuth(data);
    };

    const logout = () => {
        setAuth(null);
    };

    const value = useMemo(
        () => ({
            auth,
            login,
            logout,
        }),
        [auth]
    );

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
}

export default AuthProvider;
