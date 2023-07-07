import { useEffect, useState } from "react";
import { ApiUrl } from "../../../Api/apiConfig";
import useAuth from "../../../Hook/useAuth";
import { Autocomplete, TextField } from "@mui/material";
import useAuthorizeRequest from "../../../Hook/useAuthorizeRequest";

export default function DropDown({ label, value, dataUrl, onChange, error, helperText }) {
    const [data, setData] = useState([]);
    const [input, setInput] = useState(null);
    const [request, err, loading] = useAuthorizeRequest();

    useEffect(() => {
        if (!input) return;
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

    const handleOptionChange = (event, value) => {
        if (value && data.some((option) => option.id === value.id)) {
            onChange(value);
        } else {
            onChange(null);
        }
    };

    return (
        <Autocomplete
            freeSolo
            options={data}
            getOptionLabel={(option) => (option && option.name) || ""}
            value={value}
            filterSelectedOptions
            loading={!data}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            onInputChange={handleInputChange}
            onChange={handleOptionChange}
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
