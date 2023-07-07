import { useEffect, useState } from "react";

import { Box, Card, CardActionArea, CardContent, Grid, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import { cardStyle, imageStyle } from "../AlbumCard/AlbumCard";
import { ApiRoutes, ApiUrl } from "../../../Api/apiConfig";

function PlaylistCard(props)
{
    const theme = useTheme()
    const [image,setImage] = useState(null);
    useEffect(()=>
    {
        if(props.image!=null) 
        { 
            setImage(props.image) 
            return
        }

        if(props.songs?.length > 0)
        {
            setImage(props.songs[0].albums[0].image)
        }

    })
    

    return(
        <Box sx={cardStyle(theme)} >
           
            <CardActionArea component={Link} to = {`/Playlist/${props.id}`}>
                <Box sx={imageStyle(theme)}>
                <Box
                    component="img"               
                    sx={{ width: "100%", padding : 0}}
                    loading="lazy"
                    src =  { image?  image : ""}
                    alt={props.name}
                />
                </Box>
                <CardContent>
                    <Typography fontWeight={800} variant="body1">{props.name}</Typography>
                </CardContent>
                
            </CardActionArea>
               
        </Box>
    );
}

export  {PlaylistCard};