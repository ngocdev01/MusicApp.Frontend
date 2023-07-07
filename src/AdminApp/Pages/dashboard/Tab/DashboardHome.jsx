import React, { useEffect, useState } from "react";
import { Box, Typography, TextField, Card, CardContent } from "@mui/material";
import {
    PlayTimeBarChart,
    PlayTimeChart,
} from "../../../Component/PlayTimeChart";
import useAuth from "../../../../Hook/useAuth";
import useAuthorizeRequest from "../../../../Hook/useAuthorizeRequest";

export default function DashboardHome() {
    const [data, setData] = useState(null);
    const [monthData, setMonthData] = useState(null);

    const [toDate, setToDate] = useState(new Date(Date.now()));
    const [fromDate, setFromDate] = useState(() => {
        if (toDate) {
            let from = new Date(Date.now());
            return (from = new Date(from.setFullYear(toDate.getFullYear() - 1)));
        } else return new Date(Date.now());
    });
    const [apiData, setApiData] = useState(null);
    const auth = useAuth();
    const [request, error, loading] = useAuthorizeRequest();
    const [selectedMonth, setSelectedMonth] = useState(new Date(Date.now()));

    const handleMonthChange = (event) => {
        const selectedDate = new Date(event.target.value);
        setSelectedMonth(selectedDate);
    };
    useEffect(() => {
        const fetchData = async () => {
            if(!fromDate||!toDate) return;
            const result = await request({
                url: `https://localhost:7117/api/Admin/play/year?from=${fromDate.toJSON()}&to=${toDate.toJSON()}`,
            });

            const data = result.map((element) => {
                const time = new Date(element.key);
                return {
                    key: `${time.getMonth() + 1} - ${time.getFullYear()}`,
                    value: element.value,
                };
            });
            setData(data);
        };

        fetchData();
    }, [fromDate, toDate]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await request({
                url: `https://localhost:7117/api/Admin/play/month?month=${selectedMonth.toJSON()}`,
            });

            const data = result.map((element) => {
                const time = new Date(element.key);
                return {
                    key: `${time.getDate()}`,
                    value: element.value,
                };
            });
            setMonthData(data);
        };

        fetchData();
    }, [selectedMonth]);

    useEffect(() => {
        const fetchApiData = async () => {
            const result = await request({
                url: "https://localhost:7117/api/Admin",
            });

            setApiData(result);
        };

        fetchApiData();
    }, []);

    const handleFromDateChange = (event) => {
        const selectedDate = new Date(event.target.value);
        setFromDate(selectedDate);
    };

    const handleToDateChange = (event) => {
        const selectedDate = new Date(event.target.value);
        setToDate(selectedDate);
    };

    return (
        <Box>
            <Box
                sx={{
                    display: "grid",
                    gridGap: "30px",
                    gridTemplateColumns: "1fr 1fr",
                    width: "100%",
                    minHeight: "350px",
                    paddingY: "20px",
                }}
            >
                <Box sx={chartStyle}>
                    <Typography variant="h4">Play Time</Typography>
                    <Box sx={{ width: "100%", height: "300px" }}>
                        {data && <PlayTimeChart data={data} color="#3535FF" />}
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            padding: "10px",
                            justifyContent: 'space-between',
                            width: '100%'
                        }}
                    >
                        <TextField
                            id="month-picker"
                            label="Select Month"
                            type="month"
                            value={fromDate?.toISOString().slice(0, 7)}
                            onChange={handleFromDateChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            id="month-picker"
                            label="Select Month"
                            type="month"
                            value={toDate?.toISOString().slice(0, 7)}
                            onChange={handleToDateChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Box>
                </Box>
                <Box sx={chartStyle}>
                    <Typography variant="h4">
                        Play Time in{" "}
                        {selectedMonth.getMonth() +
                            1 +
                            " - " +
                            selectedMonth.getFullYear()}
                    </Typography>
                    <Box sx={{ width: "100%", height: "300px" }}>
                        {monthData && (
                            <PlayTimeBarChart
                                data={monthData}
                                color="#3535FF"
                            />
                        )}
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            padding: "10px",
                        }}
                    >
                        <TextField
                            id="month-picker"
                            label="Select Month"
                            type="month"
                            value={selectedMonth.toISOString().slice(0, 7)}
                            onChange={handleMonthChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Box>
                </Box>
            </Box>
            {apiData && (
                <Box
                    sx={{
                        display: "grid",
                        gridGap: "20px",
                        gridTemplateColumns:
                            "repeat(auto-fit, minmax(250px, 1fr))",
                        width: "100%",
                        marginTop: "20px",
                    }}
                >
                    <Card sx={cardStyle}>
                        <CardContent>
                            <Typography
                                variant="h6"
                                component="h2"
                                sx={cardTitleStyle}
                            >
                                Songs
                            </Typography>
                            <Typography variant="h4" sx={cardValueStyle}>
                                {apiData.songs}
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
                                Albums
                            </Typography>
                            <Typography variant="h4" sx={cardValueStyle}>
                                {apiData.albums}
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
                                Artists
                            </Typography>
                            <Typography variant="h4" sx={cardValueStyle}>
                                {apiData.artists}
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
                                Playlists
                            </Typography>
                            <Typography variant="h4" sx={cardValueStyle}>
                                {apiData.platlists}
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
                                Play Time
                            </Typography>
                            <Typography variant="h4" sx={cardValueStyle}>
                                {apiData.playTime}
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
                                Users
                            </Typography>
                            <Typography variant="h4" sx={cardValueStyle}>
                                {apiData.users}
                            </Typography>
                        </CardContent>
                    </Card>
                </Box>
            )}
        </Box>
    );
}

const chartStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    height: "100%",
    width: "100%",
    borderRadius: "20px",
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
};

const cardStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    height: "100%",
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
