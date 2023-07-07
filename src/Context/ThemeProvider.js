import { ThemeProvider as Provider, createTheme } from "@mui/material";
import { useEffect } from "react";
const font = "'Open Sans', sans-serif";

const defaultTheme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "#fff",
        },

        background: {
            default: "rgba(0,0,0,0)",
            main: "#000",
            container: "#121212",
            card: "#212121",
            active: "#535353",
        },
    },
    borderRadius: {
        one: "10px",
        two: "20px",
    },
    typography: {
        fontFamily: font,
        userSelect: "none",
    },
});

export default function ThemeProvider({children}) {
    useEffect(()=>{
        document.documentElement.style.setProperty('--header','rgb(32, 80, 152)')
        document.documentElement.style.setProperty('--header-opacity',0)
        document.documentElement.addEventListener('selectstart',(e) => e.preventDefault())
    },[])

    return <Provider theme={defaultTheme}>
        {children}
    </Provider>;
}
