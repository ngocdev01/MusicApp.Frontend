import { Box } from "@mui/material";
import noise from "../GradientBackground/noise.svg";

export default function ContentHeaderBox({ children }) {
    return (
        <Box
            component="div"
            sx={{
                display: "flex",
                p: 3,
                paddingTop: "100px",
                backgroundColor: "rgb(32, 80, 152)",
                backgroundImage: `linear-gradient(transparent 0,rgba(0,0,0,.5) 100%),url(${noise})`,
                marginTop: "-64px",
            }}
        >
            {children}
        </Box>
    );
}
