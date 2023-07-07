import React from "react";
import {
    ScatterChart,
    Scatter,
    XAxis,
    YAxis,
    ZAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from "recharts";

const TrainChart = ({ data }) => {
    console.log(data)
    // Extract unique cluster IDs and sort them
    const uniqueClusters = Array.from(
        new Set(data.clusters.map((point) => point.predictedClusterId))
    ).sort((a, b) => a - b);

    // Generate a gradient of colors based on the number of clusters
    const clusterColors = generateGradientColors(uniqueClusters.length);

    function generateGradientColors(numColors) {
        const colors = [];
        const startColor = "hsl(0, 100%, 50%)"; // Start color (red)
        const endColor = "hsl(240, 100%, 50%)"; // End color (blue)
        const hueStep = 240 / (numColors - 1);

        for (let i = 0; i < numColors; i++) {
            const hue = i * hueStep;
            const color = `hsl(${hue}, 70%, 50%)`;
            colors.push(color);
        }
        return colors;
    }

    function sumArray(array) {
        return array.reduce((sum, current) => sum + current, 0);
    }

    const transformedData = data.clusters.map((point) => {
        const halfIndex = Math.floor(point.distances.length / 2);
        const firstHalf = point.distances.slice(0, halfIndex);
        const secondHalf = point.distances.slice(halfIndex);
        return {
            x: sumArray(firstHalf),
            y: sumArray(secondHalf),
            cluster: point.predictedClusterId,
        };
    });

    return (
        <ScatterChart width={800} height={600}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="x" type="number" />
            <YAxis dataKey="y" type="number" />
            <ZAxis dataKey="cluster" type="category" name="Cluster" />
            <Tooltip cursor={{ strokeDasharray: "3 3" }} />
            <Legend verticalAlign="top" align="right" layout="vertical" />
            {uniqueClusters.map((clusterId, index) => (
                <Scatter
                    key={clusterId}
                    name={`Cluster ${clusterId}`}
                    data={transformedData.filter(
                        (point) => point.cluster === clusterId
                    )}
                    fill={clusterColors[index]}
                />
            ))}
        </ScatterChart>
    );
};

export default TrainChart;
