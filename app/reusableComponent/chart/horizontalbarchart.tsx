import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

// Dataset with individual colors for each bar
const arrayList = [
  { id: 1, hractionlist: "Prehire", value: 55, fill: "#FFBA27" },
  { id: 2, hractionlist: "Hiring", value: 26, fill: "#41A4FF" },
  { id: 3, hractionlist: "Onboarding", value: 108, fill: "#00FF47" },
  { id: 4, hractionlist: "Supplier Onboarding", value: 22, fill: "#935AFF" },
];

const chartSetting = {
  xAxis: [
    {
      label: 'Value',
    },
  ],
  width: 500,
  height: 300,
};
const arrayLists =arrayList.reverse()

export default function HorizontalBars() {
  return (
    <BarChart
      dataset={arrayLists}  // Pass the entire dataset to the chart
      yAxis={[
        {
          scaleType: 'band',
          dataKey: 'id', // Use 'hractionlist' for Y-axis labels
        },
      ]}
      series={[
        {
          dataKey: 'value', // Set the value key for bar height
        },
      ]}
      layout="horizontal"
      // barLabel={({ value, dataIndex }) => arrayList[dataIndex].hractionlist} 
      {...chartSetting}
    />
  );
}
