import { Box } from "@mui/material";
import { Outlet, Route, Routes } from "react-router-dom";
import SearchHome from "./SearchHome";
import SearchResult from "./SearchResult";

export default function Search() {
    return (
        <Box>
            <Routes>
                <Route index element={<SearchHome />}/>          
                <Route path=":id/*" element={<SearchResult />} />          
            </Routes>
            
        </Box>
    );
}
