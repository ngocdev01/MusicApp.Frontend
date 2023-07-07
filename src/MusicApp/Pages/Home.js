import { useEffect, useState } from "react";
import useAuth from "../../Hook/useAuth";
import { Box } from "@mui/material";
import AlbumCardList from "../Component/AlbumCard/AlbumCardList";

function Home() {
    const auth = useAuth();
    const [albums0, setAlbums0] = useState(null);
    const [albums, setAlbums] = useState(null);
    const [albums1, setAlbums1] = useState(null);

    useEffect(() => {
        const GetData = async () => {
            const fetchRes = await fetch(
                "https://localhost:7117/api/Album/topPlay?take=10",
                {}
            );

            const fetchRes0 = await fetch(
                "https://localhost:7117/api/Album/Top?top=6&orderBy=songCount",
                {}
            );

            const from = new Date();
            from.setMonth(from.getMonth() - 1);

            const to = new Date();

            const url = new URL("https://localhost:7117/api/Album/topPlay");
            url.searchParams.set("from",from.toLocaleDateString()); 
            url.searchParams.set("to", to.toLocaleDateString()); 
            url.searchParams.set("skip", "10"); 
            url.searchParams.set("take", "20");
            const fetchRes1 = await fetch(
                url
            );
            const data = await fetchRes.json();
            const data0 = await fetchRes0.json();
            const data1 = await fetchRes1.json();
            setAlbums(data);
            setAlbums0(data0);
            setAlbums1(data1);
        };
        GetData();
    }, []);

    return (
        <Box>
            <AlbumCardList
                loaded={albums != null}
                title="Most Played"
                albums={albums}
            />
            <AlbumCardList
                loaded={albums0 != null}
                title="Big Album"
                albums={albums0}
            />

            <AlbumCardList
                loaded={albums1 != null}
                title="Most played in month"
                albums={albums1}
            />
            {console.log(albums1)}
        </Box>
    );
}

export default Home;
function formatDate(date) {
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const year = date.getFullYear().toString().slice(-2);
    return `${month}/${day}/${year}`;
}
