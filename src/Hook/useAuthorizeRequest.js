import axios from "axios";
import useAuth from "./useAuth";
import { useState } from "react";

const useAuthorizeRequest = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const auth = useAuth();
    let headers = {
        Authorization: `Bearer ${auth?.auth?.token}`,
    };

    const request = async ({ url, method, contentType, options }) => {
        try {
            setLoading(true);
            if (contentType) headers["Content-Type"] = contentType;
            const response = await axios({
                url,
                headers: headers,
                method: method ? method : "GET",
                ...options,
            });
            if (response.status < 400) {
                setLoading(false);
              
                return response.data;
            }
        } catch (error) {
            setError(error);
            console.log(error);
        }
    };

    return [request, error, loading];
};

export default useAuthorizeRequest;
