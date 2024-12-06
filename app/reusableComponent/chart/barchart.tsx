import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import PieChartOutlinedIcon from '@mui/icons-material/PieChartOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';

export default function BarChartComponent() {
    return (
        <div style={{ overflowX: 'auto', width: '100%' }}>
            <div>
                <BarChart
                    xAxis={[{ scaleType: 'band', data: ['Jan', 'Feb', 'Mar', 'Apr'] }]}
                    series={[
                        { data: [48.5, 50.0, 60.0, 45.0], color: '#56CA00' },
                        { data: [38.0, 35.0, 40.0, 32.0], color: '#8C57FF' },
                        { data: [20.0, 22.5, 25.0, 18.0],  color: '#FFB300' },
                        { data: [5.0, 6.0, 7.0, 4.0],  color: '#FE4343' },
                    ]}
                    height={350}
                />
            </div>
        </div>
    );
}

export function Salesreport() {
    return (
        <>
            <h5 className="heading2 textheader mb-0">$482.85k</h5>
            <p className="para2 mb-0 my-2 shade">Last month balance $234.40k</p>
            <div className="mt-4 justify-content-between align-items-center pb-2">
                <div className="d-flex mt-4">
                    <div
                        className="headingicons rounded"
                        style={{
                            background: "rgb(198 249 161)",
                            height: "fit-content",
                            width: "fit-content",
                        }}
                    >
                        <PieChartOutlinedIcon className="m-1" sx={{ color: "#56CA00" }} />
                    </div>
                    <div className="ps-2">
                        <h5 className="heading2 textheader mb-0">$48,568.20</h5>
                        <p className="para2 mb-0 shade d-flex align-items-center">Total sales</p>
                    </div>
                </div>
                <div className="d-flex mt-4">
                    <div
                        className="headingicons rounded"
                        style={{
                            background: "#8C57FF29",
                            height: "fit-content",
                            width: "fit-content",
                        }}
                    >
                        <MonetizationOnOutlinedIcon className="m-1" sx={{ color: "#8C57FF" }} />
                    </div>
                    <div className="ps-2">
                        <h5 className="heading2 textheader mb-0">$38,453.25</h5>
                        <p className="para2 mb-0 shade d-flex align-items-center">Total Income</p>
                    </div>
                </div>
                <div className="d-flex mt-4">
                    <div
                        className="headingicons rounded"
                        style={{
                            background: "rgba(255, 204, 95, 0.30)",
                            height: "fit-content",
                            width: "fit-content",
                        }}
                    >
                        <CreditCardOutlinedIcon className="m-1" sx={{ color: "#FFB300" }} />
                    </div>
                    <div className="ps-2">
                        <h5 className="heading2 textheader mb-0">$2,453.45</h5>
                        <p className="para2 mb-0 shade d-flex align-items-center">Total Expense</p>
                    </div>
                </div>
                <div className="d-flex mt-4">
                    <div
                        className="headingicons rounded"
                        style={{
                            background: "#FFD0D0",
                            height: "fit-content",
                            width: "fit-content",
                        }}
                    >
                        <AccessTimeOutlinedIcon className="m-1" sx={{ color: "#FE4343" }} />
                    </div>
                    <div className="ps-2">
                        <h5 className="heading2 mb-0" style={{ color: "#FF4C51" }}>
                            $2,453.45
                        </h5>
                        <p className="para2 mb-0 shade d-flex align-items-center">Total Pending</p>
                    </div>
                </div>
            </div>
        </>
    );
}
