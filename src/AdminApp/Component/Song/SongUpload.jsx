import React, { useState } from "react";
import { CircleLoading } from "../Loading";
import useAuthorizeRequest from "../../../Hook/useAuthorizeRequest";
import SongInput from "./SongInput";

const SongUpload = () => {
    const [isUpload, setIsUpload] = useState(false);
    const [request, error, loading] = useAuthorizeRequest();



    const upLoad =  async () =>
    {      
        setIsUpload(true)
    } 


    return (
        <SongInput edit={false}/>
    );
};

export default SongUpload;
