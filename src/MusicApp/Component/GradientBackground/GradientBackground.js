import styled from "@emotion/styled";
import noise from './noise.svg'

const GradientBox = styled("div")(({ theme ,...props}) => ({
    backgroundImage: `linear-gradient(rgba(0,0,0,0.6) 0,${theme.palette.background.container} 100%),url(${noise})`,
    backgroundColor: props.backgroundColor,
    height: "300px",
    position: "absolute",
    width: "100%",
    zIndex: "-1",
}));



export default function GradientBackground({ height }) {
    return (
            <GradientBox backgroundColor = 'rgb(32, 80, 152)'/>
    );
}
