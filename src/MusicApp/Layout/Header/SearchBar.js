import styled from "@emotion/styled";
import { SearchRounded } from "@mui/icons-material";
import { Box, InputBase, alpha } from "@mui/material";
import { useEffect, useState } from "react";
import {
    matchPath,
    useLocation,
    useNavigate,
    useParams,
} from "react-router-dom";

export default function SearchBar() {
    const params = useParams();
    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        let redirectPath = `/search/${keyword}`;

        const path = location.pathname;
        const type = matchPath("search/:id/:type", path);
        if (type && keyword) {
            redirectPath = redirectPath.concat("/", type.params.type);
            console.log(redirectPath);
        }

        const timeOutId = setTimeout(
            () => navigate(redirectPath, { replace: true }),
            500
        );
        return () => clearTimeout(timeOutId);
    }, [keyword]);

    return (
        <Search>
            <SearchIconWrapper>
                <SearchRounded />
            </SearchIconWrapper>
            <StyledInputBase
                autoFocus
                onChange={(event) => setKeyword(event.target.value)}
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                value={keyword}
            />
        </Search>
    );
}

const Search = styled("div")(({ theme }) => ({
    position: "relative",
    height: "100%",
    display: "flex",

    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },

    
    width: "100%",
    border: "1px solid grey",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
   
    paddingLeft: '10px',
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    height: "100%",
    justifyContent: "center",

    "& .MuiInputBase-input": {
        fontSize: "1rem",
        overflow: "hidden",
        textOverflow: "ellipsis",
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(5)})`,
        paddingRight: "30px",
        width: "100%",
    },
}));
