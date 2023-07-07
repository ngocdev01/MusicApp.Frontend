import { createPortal } from "react-dom";
import "../Shared/button.css"
import useAuth from "../../Hook/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { Box, Button, Dialog, Paper, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";

function AuthDialog(props) {
    const { onClose, open } = props;    

    return (
        <Dialog onClose={onClose}  open={open}>
            <Box sx=
                {{
                    display: 'flex', 
                    flexDirection: 'column' , 
                    height : 700 , 
                    width: 500,
                    backgroundColor: "black",
                    boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
                
                }} component={Paper}>
                <Typography variant="h4" color="white">You need to login to access this content</Typography>
                
                <Button variant="contained" color="success" component={Link} to = "/login">Login</Button>
                <Button variant="contained" component={Link} to = "/signUp">Sign Up</Button>
                <Button variant="outlined" onClick={onClose}>Back</Button>
            </Box>
        </Dialog>
    );
}
  
export default AuthDialog;