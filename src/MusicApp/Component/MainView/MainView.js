import { Box } from "@mui/material";

const style = {
    position: "sticky",
    height: "64px",
    width: "100%",
    backgroundColor: "transparent",
    top: 0,
    zIndex: 1,
};

export default function MainView({ children }) {
    return (
        <>
            <Box sx={style}></Box>
            <Box >{children}</Box>
        </>
    );
}
