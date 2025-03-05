import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';

// Sample dataset (Monday to Sunday)
const dataset = [
  { day: 'Mon', value: 10000 },
  { day: 'Tue', value: 20000 },
  { day: 'Wed', value: 15000 },
  { day: 'Thu', value: 30000 },
  { day: 'Fri', value: 25000 },
  { day: 'Sat', value: 40000 },
  { day: 'Sun', value: 60000 },
];

// ✅ Fixed valueFormatter to handle null values
const valueFormatter = (value: number | null) => (value !== null ? `${value / 1000}K` : '0K');

export default function Singlebarchart() {
  return (
    <div style={{ width: '100%' }}>
      <BarChart
        dataset={dataset}
        xAxis={[
          {
            scaleType: 'band',
            dataKey: 'day',
            tickPlacement: 'middle',
            tickLabelPlacement: 'middle',
          },
        ]}
        yAxis={[
          {
            label: 'Value (K)',
            tickMinStep: 10000, // Ensures Y-axis has 10K increments
          },
        ]}
        series={[
          {
            dataKey: 'value',
            label: 'Values',
            valueFormatter, // ✅ Fixed TypeScript issue here
            color: '#AD87FF', // 🎨 Custom bar color
          },
        ]}
        height={300}
        sx={{
          [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
            transform: 'translateX(-10px)',
          },
        }}
      />
    </div>
  );
}
