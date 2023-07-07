import { Box, Link } from "@mui/material";

function SongCard({ data, justifyContent = "left" }) {
    return (
        <>
            {data && (
                <Box
                    component="div"
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: { justifyContent },
                        backgroundColor: "transparent",
                        width: "100%",
                       
                    }}
                >
                    <Box
                        component="img"
                        sx={{
                            aspectRatio: "1/1",
                            height: "50px",
                            objectFit: "cover",
                            padding: 0,
                        }}
                        src={data.albums[0].image}
                        alt={data.song.name}
                    />

                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            paddingLeft: 3,
                        }}
                    >
                        <Link color="white" variant="body1" underline="hover">
                            {data.song.name}
                        </Link>
                        <Box display="flex" color="grey">
                            {data.artists.map((artist, index) => {
                                return (
                                    <Box key={index} display="flex">
                                        <Link
                                            href= {`/artist/${artist.id}`}
                                            variant="body2"
                                            underline="hover"
                                            color="grey"
                                        >
                                            {artist.name}
                                        </Link>
                                        {index < data.artists.length - 1 &&
                                            ` - `}
                                    </Box>
                                );
                            })}
                        </Box>
                    </Box>
                </Box>
            )}
        </>
    );
}

export default SongCard;
