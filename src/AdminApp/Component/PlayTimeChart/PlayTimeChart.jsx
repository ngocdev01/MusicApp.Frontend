import React from 'react';
import { Box, Typography } from '@mui/material';
import {
  Text,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
} from 'recharts';

const CustomTooltip = ({ active, payload }) => {
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
        <Typography variant="body2">
          Plays: {payload[0].value}
        </Typography>
      </Box>
    );
  }

  return null;
};

export default function PlayTimeChart({ data, color, title }) {
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
        <LineChart data={data}>
          <CartesianGrid vertical={false} horizontal={true} />
          <Line
            type='linear'
            dataKey="value"
            strokeWidth={3}
            dot={false}
            stroke={color}
          />

          <RechartsTooltip content={<CustomTooltip />} />

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
          />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
}
