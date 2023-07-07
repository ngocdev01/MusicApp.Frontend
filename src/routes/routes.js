import Album from "../MusicApp/Component/Album/Album";
import LoginForm from "../MusicApp/Pages/Login/Login";
import PlayList from "../MusicApp/Component/PlayList/PlayList";
import Home from "../MusicApp/Pages/Home";
import Library from "../MusicApp/Pages/Library";
import Queue from "../MusicApp/Pages/Queue";
import Search from "../MusicApp/Pages/Search/Search";
import DashboardLayout from "../AdminApp/Pages/dashboard/DashboardLayout";
import Page404 from "./Page404";
import SignUp from "../MusicApp/Pages/SignUp/SignUp";
import { Profile } from "../MusicApp/Pages/Profile/Profile";
import NotAuthorizedPage from "./NotAuthorizedPage";
import { Artist } from "../MusicApp/Component/Artist";

const devRoutes = [
    {
        path: "/Auth/login",
        component: <LoginForm />,
        name: "Login",
    },
    {
        path: "/Auth/signup",
        component: <SignUp />,
        name: "SignUp",
    },
    {
        path: "*",
        component: <Page404 />,
        name: "Not Found",
    },
    
    {
        path: "/notAuth",
        component: <NotAuthorizedPage/>,
        name: "Not Authorized Page",
    },
    {
        auth: true,
        path: "/admin/*",
        component: <DashboardLayout />,
        name: "Admin",
        role: "Admin",
    },
   
];
const publicRoutes = [
    {
        path: "/",
        component: <Home />,
        name: "Home",
    },
    {
        path: "/Search/*",
        component: <Search />,
        name: "Search",
    },
    
    {
        path: "/Queue/",
        component: <Queue />,
        name: "Queue",
    },
    {
        path: "/Album/:id",
        component: <Album />,
        name: "Album",
    },
    {
        path: "/Artist/:id",
        component: <Artist />,
        name: "Artist",
    },
];

const authRoutes = [
    {
        path: "/library",
        component: <Library />,
        name: "Library",
    },
    {
        path: "/playlist/:id",
        component:  <PlayList />,
        name: "playlist",
    },
    {
        path: "/profile/:id",
        component: <Profile />,
        name: "Profile",
    },
   
    
];

export { publicRoutes, authRoutes, devRoutes };
