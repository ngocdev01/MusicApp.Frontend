import { AppBar, Box, Hidden } from "@mui/material";
import { useTheme } from "@emotion/react";
import MainView from "../../Component/MainView/MainView";
import { useEffect, useRef } from "react";

function ContentPanel({ children }) {
    const theme = useTheme();
    const scrollRef = useRef();
    const style = {
        backgroundColor: theme.palette.background.container,
        gridArea: "main-view/main-view/main-view/right-sidebar",
        overflowY: "scroll",
        overflowX: "hidden",
        borderRadius: theme.borderRadius.one,
        height: '100%',
        zIndex: 0,
        "&::-webkit-scrollbar": {
            display: "none",
        },
      
        /* Hide scrollbar for IE, Edge and Firefox */

        msOverflowStyle: "none" /* IE and Edge */,
        scrollbarWidth: "none" /* Firefox */,
    };

    useEffect(() => {
        const scrollEvent = (e) => {
            const opacity =
                e.target.scrollTop < 100 ? 0 : (e.target.scrollTop - 100) / 200;
            document.documentElement.style.setProperty(
                "--header-opacity",
                opacity
            );
        };
        scrollRef.current.addEventListener("scroll", scrollEvent);
        return () => {
            scrollRef.current?.removeEventListener("scroll", scrollEvent);
        };
    },[]);

    return (
        <Box ref={scrollRef} sx={style}>
            <MainView>{children}</MainView>
        </Box>
    );
}

export default ContentPanel;
