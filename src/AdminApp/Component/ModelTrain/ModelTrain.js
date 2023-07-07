import React, { useState, useEffect } from "react";
import useAuthorizeRequest from "../../../Hook/useAuthorizeRequest";
import TrainChart from "./TrainChart";
import {
    Box,
    Button,
    Card,
    CardContent,
    Input,
    TextField,
    Typography,
} from "@mui/material";

function ModelTrain() {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [request] = useAuthorizeRequest();
    const [clusterNumber, setClusterNumber] = useState(null);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await request({
                url: `https://localhost:7117/api/Admin/train?clusterNumber=${clusterNumber}`,
            });
            setData(response);
            localStorage.setItem("clusterData", JSON.stringify(response));
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleFetchData = () => {
        fetchData();
    };

    useEffect(() => {
        // Load data from localStorage if available when the component is mounted
        const savedData = localStorage.getItem("clusterData");
        if (savedData) {
            try {
                const parsedData = JSON.parse(savedData);
                setData(parsedData);
            } catch (error) {
                console.log("Invalid JSON in localStorage:", error);
                localStorage.removeItem("clusterData");
            }
        }
    }, []);

    return (
        <Box>
            {data && (
                <Box>
                    <Box display="flex" justifyContent="center">
                        <TrainChart data={data} />
                    </Box>
                    <br />
                    <Box display='grid' gridTemplateColumns='1fr 1fr' padding={5}>
                        <Card sx={cardStyle}>
                            <CardContent>
                                <Typography
                                    variant="h6"
                                    component="h2"
                                    sx={cardTitleStyle}
                                >
                                    Average Distance
                                </Typography>
                                <Typography variant="h4" sx={cardValueStyle}>
                                    {data.averageDistance.toFixed(5)}
                                </Typography>
                            </CardContent>
                        </Card>
                        <Card sx={cardStyle}>
                            <CardContent>
                                <Typography
                                    variant="h6"
                                    component="h2"
                                    sx={cardTitleStyle}
                                >
                                    Davies Bouldin Index
                                </Typography>
                                <Typography variant="h4" sx={cardValueStyle}>
                                    {data.daviesBouldinIndex.toFixed(5)}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Box>
                </Box>
            )}
            <Box display="flex" gap={10} justifyContent="center">
                <Button
                    variant="contained"
                    onClick={handleFetchData}
                    disabled={isLoading}
                >
                    Train new cluster
                </Button>

                <TextField
                    label="CLuster Number"
                    value={clusterNumber}
                    onChange={(e) => setClusterNumber(e.currentTarget.value)}
                ></TextField>
            </Box>
        </Box>
    );
}

export default ModelTrain;
const cardStyle = {
    display: "flex",
    flexDirection: "column",
    justifySelf: 'center',
    alignItems: "center",
    padding: "20px",
    height: "100%",
    maxWidth: '300px',
    borderRadius: "20px",
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
};
const cardTitleStyle = {
    marginBottom: "10px",
    textAlign: "center",
};

const cardValueStyle = {
    textAlign: "center",
    fontSize: "2rem",
};
