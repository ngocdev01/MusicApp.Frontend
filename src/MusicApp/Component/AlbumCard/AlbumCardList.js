import { Box, Typography, Skeleton } from "@mui/material";
import { Suspense, lazy, useEffect, useRef, useState } from "react";
import AlbumCardLoading from "./AlbumCardLoading";
import AlbumCard from "./AlbumCard";

export default function AlbumCardList(props) {
    const minWidth = 200;
    const maxEle = 6;

    const [eleNumber, setEleNumber] = useState(0);
    const listRef = useRef();
    const cardTableStyle = {
        display: "grid",
        justifyItems: "left",
        gridTemplateColumns: `repeat(${eleNumber},1fr)`,
        gridGap: 10,
    };

    useEffect(() => {
        const element = listRef?.current;

        if (!element) return;
        const resizeObserver = new ResizeObserver(() => {
            setEleNumber(
                Math.min(maxEle, Math.floor(element.clientWidth / minWidth))
            );
        });

        resizeObserver.observe(element);
        return () => {
            resizeObserver.disconnect();
        };
    }, []);

    return (
        <Box width="100%" p={3} ref={listRef}>
            <Typography
                variant="h2"
                fontSize="2rem"
                color="white"
                fontWeight="600"
                paddingY="30px"
                sx={{ userSelect: "none" }}
            >
                {props.title}
            </Typography>

            <Box sx={cardTableStyle}>
                {Array.from(Array(eleNumber), (element, index) => {
                    return !props.loaded ? (
                        <AlbumCardLoading key={index} />
                    ) : (
                        props.albums[index] && (
                            <AlbumCard
                                key={index}
                                album={props.albums[index]}
                            />
                        )
                    );
                })}
            </Box>
        </Box>
    );
}
