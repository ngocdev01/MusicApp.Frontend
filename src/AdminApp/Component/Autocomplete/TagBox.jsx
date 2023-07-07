import { Autocomplete, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { ApiUrl } from "../../../Api/apiConfig";
import useAuth from "../../../Hook/useAuth";
import useAuthorizeRequest from "../../../Hook/useAuthorizeRequest";

export default function TagBox({
    label,
    value,
    dataUrl,
    onChange,
    error,
    helperText,
}) {
    const [data, setData] = useState([]);
    const [input, setInput] = useState(null);
    const auth = useAuth();
    const [request, err, loading] = useAuthorizeRequest();

    useEffect(() => {
        if (!input || !input.trim()) return;
        const fetchData = async () => {
            const url = new URL(ApiUrl.concat(dataUrl));
            url.searchParams.append("keyword", input.trim());
            const data = await request({
                url: url.href,
            });
            setData(data ? data : []);
        };
        fetchData();
    }, [input]);

    const handleInputChange = (event, value) => {
        setInput(value);
    };

    const handleOptionChange = (event, newValue) => {
        if (newValue && newValue.length > 0) {
            if (newValue[newValue.length - 1]?.id) {
                onChange(newValue);
            }
        } else {
            onChange([]); 
        }
    };

    return (
        <Autocomplete
            multiple
            freeSolo
            options={data}
            getOptionLabel={(option) => (option && option.name) || ""}
            value={value}
            filterSelectedOptions
            loading={!data}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            onInputChange={handleInputChange}
            onChange={handleOptionChange} // Enable creating new options
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={label}
                    placeholder={label}
                    error={error} // Add error prop
                    helperText={helperText} // Add helperText prop
                />
            )}
        />
    );
}
