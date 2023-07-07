import React from 'react';
import { Box, Typography } from '@mui/material';
import {
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  XAxis,
  YAxis,
  BarChart,
  Bar,
  CartesianGrid,
} from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <Box
        sx={{
          background: 'rgba(255, 255, 255, 0.9)',
          border: '1px solid #ccc',
          borderRadius: '5px',
          padding: '10px',
        }}
      >
        <Typography variant="body2">Days: {label}</Typography>
        <Typography variant="body2">Plays: {payload[0].value}</Typography>
      </Box>
    );
  }

  return null;
};

export default function PlayTimeBarChart({ data, color, title }) {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        borderRadius: '10px',
        padding: '10px',
      }}
    >
      <Typography variant="h6" color="primary" marginBottom="10px">
        {title}
      </Typography>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={data}>
          <CartesianGrid stroke="#ccc" vertical={false} />
          <Bar dataKey="value" fill={color} />

          <RechartsTooltip
            content={<CustomTooltip />}
          />

          <XAxis
            stroke="#777"
            strokeWidth={0}
            fontSize={10}
            dataKey="key"
          />
          <YAxis
            stroke="#777"
            strokeWidth={0}
            fontSize={10}
            tickLine={false}
            allowDecimals={false}
          />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
}
