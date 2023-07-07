import { Box } from "@mui/material";

const style = {
    height: "30vh",
    maxHeight: "400px",
    minHeight: "340px",

    display: "flex",
    overflow: "hidden",
    padding: "24px",
    position: "relative",
};

export default function ContentBox({ children, ...props }) {
    return (
        <Box sx={style} {...props}>
            {children}
        </Box>
    );
}
