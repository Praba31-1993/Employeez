import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

export default function BarChartComponent() {
  return (
    <div style={{ overflowX: 'auto', width: '100%' }}>
      <div style={{ minWidth: '1200px' }}>
        <BarChart
          xAxis={[
            {
              scaleType: 'band',
              data: [
                'Group 1', 'Group 2', 'Group 3', 'Group 4', 'Group 5',
                'Group 6', 'Group 7', 'Group 8', 'Group 9', 'Group 10',
                'Group 11', 'Group 12', 'Group 13', 'Group 14', 'Group 15',
                'Group 16', 'Group 17', 'Group 18', 'Group 19', 'Group 20',
              ],
            },
          ]}
          series={[
            { label: 'Series 1', data: [4, 3, 5, 6, 7, 8, 4, 5, 9, 3, 7, 8, 5, 6, 4, 7, 9, 2, 8, 6] },
            { label: 'Series 2', data: [2, 5, 6, 3, 9, 4, 7, 5, 8, 4, 6, 7, 3, 5, 8, 4, 5, 6, 7, 3] },
            { label: 'Series 3', data: [6, 4, 3, 5, 7, 8, 5, 4, 9, 6, 8, 7, 5, 9, 4, 6, 3, 5, 8, 7] },
          ]}
          height={300}
        />
      </div>
    </div>
  );
}
