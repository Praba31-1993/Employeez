import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { datasetData, valueFormatter } from "./dataset";

const chartSetting = {
  xAxis: [
    {
      label: "rainfall (mm)",
    },
  ],
  width: 500,
  height: 400,
};

export default function HorizontalBars() {
  return (
    <BarChart
      dataset={datasetData}
      yAxis={[{ scaleType: "band", dataKey: "month" }]}
      series={[{ dataKey: "seoul", label: "Seoul rainfall", valueFormatter }]}
      layout="horizontal"
      {...chartSetting}
      height={245}
    />
  );
}
