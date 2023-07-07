import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { authRoutes, devRoutes, publicRoutes } from "./routes/routes";
import Layout from "./MusicApp/Layout/Layout";
import { Box, CssBaseline } from "@mui/material";
import AlertProvider from "./Context/AlertProvider";
import ThemeProvider from "./Context/ThemeProvider";
import AuthProvider from "./Context/AuthProvider";
import AuthorizeRoute from "./routes/AuthorizeRoute";
import ModalContextProvider from "./Context/ModalContext";

const Modal = () => {
    return (
        <div>
            <h1>This is a modal</h1>
            <p>This is the content of the modal</p>
        </div>
    );
};

function App() {
    return (
        <Box height="100vh">
            <AuthProvider>
                <AlertProvider>
                    <CssBaseline />

                    <BrowserRouter>
                        <ModalContextProvider>
                            <Routes>
                                <Route element={<Layout />}>
                                    {publicRoutes.map((route, index) => {
                                        return (
                                            <Route
                                                key={index}
                                                path={route.path}
                                                element={route.component}
                                            />
                                        );
                                    })}

                                    {authRoutes.map((route, index) => {
                                        return (
                                            <Route
                                                key={index}
                                                path={route.path}
                                                element={
                                                    <AuthorizeRoute
                                                        role={route.role}
                                                    >
                                                        {route.component}
                                                    </AuthorizeRoute>
                                                }
                                            />
                                        );
                                    })}
                                </Route>

                                {devRoutes.map((route, index) => {
                                    if (route.auth)
                                        return (
                                            <Route
                                                key={index}
                                                path={route.path}
                                                element={
                                                    <AuthorizeRoute
                                                        role={route.role}
                                                    >
                                                        {route.component}
                                                    </AuthorizeRoute>
                                                }
                                            />
                                        );
                                    else
                                        return (
                                            <Route
                                                key={index}
                                                path={route.path}
                                                element={route.component}
                                            />
                                        );
                                })}
                            </Routes>
                        </ModalContextProvider>
                    </BrowserRouter>
                </AlertProvider>
            </AuthProvider>
        </Box>
    );
}

export default App;
