import React, { useState } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts/ChartsAxis";
import { Colors } from "@/app/reusableComponent/styles";
import { chartdataset } from "@/app/reusableComponent/JsonData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

interface chartInterface {
  close: () => void;
}
function valueFormatter(value: number | null) {
  return `${value}mm`;
}

const chartSetting = {
  yAxis: [
    {
      label: "Rainfall (mm)",
    },
  ],
  width: 900,
  height: 350,

  sx: {
    "& .MuiChartsLegend-root": {
      fontSize: "30px !important",
      paddingLeft: "30px",
    },
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: "translate(-20px, 0)",
    },
    padding: "15px",
  },
};

const statusList = [
  { id: 20, label: "Day" },
  { id: 21, label: "Month" },
  { id: 22, label: "Year" },
];

export default function BasicBars({ close }: chartInterface) {
  const [selectedTimeType, setSelectedTimeType] = useState("day");
  const useColors = Colors();

  const dataset = chartdataset;
  return (
    <div>
      <div className="d-flex justify-content-end">
        <FontAwesomeIcon
          style={{ cursor: "pointer" }}
          className="my-2 textheader"
          icon={faXmark}
          onClick={close}
        />
      </div>

      {/* Dropdown for Time Selection */}

      <div className="d-flex gap-3 justify-content-end p-3">
        <button
          className="outlinebtn rounded px-3 py-1"
          style={{
            color: useColors.themeRed,
            border: `1px solid ${useColors.themeRed}`,
            height: "fit-content",
          }}
          onClick={() => setSelectedTimeType("day")}
        >
          Day
        </button>
        <button
          className="outlinebtn rounded px-3 py-1"
          style={{
            color: useColors.themeRed,
            border: `1px solid ${useColors.themeRed}`,
            height: "fit-content",
          }}
          onClick={() => setSelectedTimeType("month")}
        >
          Month
        </button>
        <button
          className="outlinebtn rounded px-3 py-1"
          style={{
            color: useColors.themeRed,
            border: `1px solid ${useColors.themeRed}`,
            height: "fit-content",
          }}
          onClick={() => setSelectedTimeType("year")}
        >
          Year
        </button>
      </div>

      {/* Bar Chart Container */}
      <div style={{ overflowX: "auto", width: "100%" }}>
        <div style={{ minWidth: "900px" }}>
          <BarChart
            dataset={dataset.filter(
              (data) => data.timeType === selectedTimeType
            )}
            xAxis={[{ scaleType: "band", dataKey: "timeValue" }]}
            series={[
              {
                dataKey: "london",
                label: "London",
                valueFormatter,
                color: "#019267",
              },
              {
                dataKey: "paris",
                label: "Paris",
                valueFormatter,
                color: "#00C897",
              },
              {
                dataKey: "newYork",
                label: "New York",
                valueFormatter,
                color: "#FFD365",
              },
              {
                dataKey: "seoul",
                label: "Seoul",
                valueFormatter,
                color: "#FDFFA9",
              },
            ]}
            layout="vertical"
            slotProps={{
              legend: {
                direction: "row",
                position: { vertical: "top", horizontal: "left" },
                padding: 5,
              },
            }}
            {...chartSetting}
          />
        </div>
      </div>
    </div>
  );
}
