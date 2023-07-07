import { useState } from "react";
import useAuth from "../../../Hook/useAuth";
import {
    Alert,
    AlertTitle,
    Avatar,
    Box,
    Button,
    Container, Grid,
    Link,
    TextField,
    ThemeProvider,
    Typography,
    createTheme
} from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import { ApiRoutes, ApiUrl } from "../../../Api/apiConfig";

export default function LoginForm() {

    const [error, setError] = useState(null);
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const { auth, login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const loginValue = {
            email: user,
            password: password,
        };

        const loginUrl = ApiUrl + ApiRoutes.login;

        try {
            const response = await fetch(loginUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(loginValue),
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                login({
                    token: data.token,
                    userName: data.userName,
                    email: data.email,
                    role: data.role,
                    id: data.id,
                });
            } else {
                const data = await response.json();
                console.log(data);
                setError(data.error);
            }
        } catch (err) {
            if (!err.response) setError("no response");
            else setError(err.response.json());
        }
    };

    const theme = createTheme();
    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                        <LockOutlined />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>

                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        noValidate
                        sx={{ mt: 1 }}
                    >
                        {error && (
                            <Alert severity="error">
                                <AlertTitle>Error</AlertTitle>
                                {error}
                            </Alert>
                        )}
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onChange={(e) => setUser(e.currentTarget.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={(e) => setPassword(e.currentTarget.value)}
                        />
                        {/* <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    /> */}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="signup" variant="body2">
                                    Don't have an account? Sign up
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                
            </Container>
        </ThemeProvider>
    );
}

function Copyright(props) {
    return (
        <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            {...props}
        >
            {"Copyright © "}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}
