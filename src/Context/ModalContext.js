import { Box, Button, Dialog, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function ModalContextProvider({ children }) {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.hash === "#login") {
            setIsOpen(true);
        }
    }, [location]);

    function onClose() {
        setIsOpen(false);
        navigate(location.pathname);
    }

    return (
        <>
            {children}
            {isOpen && (
                <Dialog
                    open={isOpen}
                    onClose={onClose}
                    PaperProps={{
                        sx: {
                            borderRadius: "20px",
                        },
                    }}
                >
                    <Paper
                        sx={{
                            backgroundColor: "#353535",
                            borderRadius: "10px",
                        }}
                    >
                        <Box
                            sx={{
                                width: 400,
                                height: 500,
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            <Box
                                width="100%"
                                display="flex"
                                justifyContent="center"
                            >
                                <Typography
                                    padding={1}
                                    color="white"
                                    fontWeight={700}
                                    variant="h5"
                                >
                                    You need login to access
                                </Typography>
                            </Box>
                            <Box
                                paddingTop={20}
                                width="100%"
                                display="flex"
                                justifyContent="center"
                            >
                                <Button
                                    sx={{ height: "50px", width: "70%" }}
                                    variant="contained"
                                    backgroundColor="lightblue"
                                    onClick={() => {
                                        navigate("/auth/login");
                                        setIsOpen(false);
                                    }}
                                >
                                    LOGIN
                                </Button>
                            </Box>
                            <Box
                                paddingTop={5}
                                width="100%"
                                display="flex"
                                justifyContent="center"
                            >
                                <Button
                                    sx={{ height: "50px", width: "70%" }}
                                    variant="contained"
                                    backgroundColor="lightblue"
                                    onClick={() => {
                                        navigate("/auth/signup");
                                        setIsOpen(false);
                                    }}
                                >
                                    Signup
                                </Button>
                            </Box>
                        </Box>
                    </Paper>
                </Dialog>
            )}
        </>
    );
}
