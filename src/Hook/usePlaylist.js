import { useContext, useEffect, useState } from "react";
import { PlaylistContext } from "../Context/PlaylistProvider";
import useAuth from "./useAuth";
import useAuthorizeRequest from "./useAuthorizeRequest";
import { ApiRoutes, ApiUrl } from "../Api/apiConfig";

export default function usePlaylist() {
    const { playlist, setPlaylist } = useContext(PlaylistContext);
    const [update, setUpdate] = useState(false);
    const auth = useAuth();
    const [request] = useAuthorizeRequest();
    const shouldUpdate = () => setUpdate(!update);
    useEffect(() => {
        if (!auth?.auth) {
            setPlaylist(null);
            return;
        }

        const fetchData = async () =>
        {
            const url = new URL(ApiRoutes.playlist,ApiUrl);
            const param = url.searchParams
            param.set("ownerId",auth.auth.id)
            const data = await request({
                url : url      
            })
            setPlaylist(data)
           
        }
        fetchData();
      
    }, [update,auth.auth])

    return {playlist,shouldUpdate}
}
