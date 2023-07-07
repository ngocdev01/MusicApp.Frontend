import React, { useEffect, useRef, useState } from "react";
import { ApiUrl } from "../../../Api/apiConfig";
import { useParams } from "react-router-dom";
import useAuth from "../../../Hook/useAuth";
import { CircleLoading } from "../Loading";
import useAuthorizeRequest from "../../../Hook/useAuthorizeRequest";
import SongInput from "./SongInput";

const SongEdit = () => {
    const params = useParams();
    const [data, setData] = useState(null);
    const [isUpload, setIsUpload] = useState(false);

    const [request, error, loading] = useAuthorizeRequest();

    useEffect(() => {
        const fetchData = async () => {
            const song = await request({
                url: ApiUrl.concat("/api/Song/", params.id)
            });
            setData(song);
        };
        fetchData();
    }, [params.id]);

    const upLoad =  async () =>
    {
       
        setIsUpload()
    } 

    if (!data) return <CircleLoading />;

    return (
        <SongInput defaultSong={data} edit = {true}/>
    );
};

export default SongEdit;
