'use client';

import styled from '@emotion/styled';
import { Typography, Card, CardContent } from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { useState } from 'react';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels,
);

const StyledCard = styled(Card)`
  background-color: rgba(30, 58, 138, 0.8);
  border: 3px solid #c0c0c0;
  border-radius: 15px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.6);
  color: white;
  padding: 16px;
  margin-top: 16px;
  width: 90vw;
  max-width: 600px;
  box-sizing: border-box;
  min-height: 500px;

  @media (min-width: 768px) {
    width: 600px;
    padding: 24px;
    min-height: 400px;
  }
`;

const StyledCardContent = styled(CardContent)`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export default function CleanAreaGraph() {
  const [data] = useState({
    labels: ['デスク', 'リビング', 'キッチン', 'トイレ', 'バスルーム'],
    datasets: [
      {
        label: 'Defeated Count',
        data: [5, 7, 8, 4, 9],
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 2,
      },
    ],
  });

  const options = {
    indexAxis: 'x' as const,
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 1,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        color: '#ffffff',
        font: {
          size: 16,
        },
      },
      datalabels: {
        color: '#fff',
        anchor: 'end',
        align: 'end',
        formatter: (value: number) => value,
        font: {
          weight: 'bold',
          size: 14,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          color: '#ffffff',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.2)',
        },
      },
      x: {
        ticks: {
          color: '#ffffff',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.2)',
        },
      },
    },
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="absolute left-1/2 top-16 z-10 mt-2 -translate-x-1/2 text-4xl font-bold text-white">
        <p
          className="mt-2 min-w-[300px] rounded-md bg-black/50 p-4 text-center text-2xl sm:mb-2 sm:text-2xl md:text-5xl"
          style={{ whiteSpace: 'nowrap' }}
        >
          掃除場所別のグラフ
        </p>
      </div>
      <StyledCard>
        <StyledCardContent>
          <Typography
            variant="h5"
            align="center"
            gutterBottom
            sx={{
              fontWeight: 'bold',
              marginBottom: '16px',
              borderBottom: '2px solid #ccc',
              paddingBottom: '8px',
              fontSize: { xs: 'clamp(1.2rem, 4vw, 2rem)', md: '2rem' },
              whiteSpace: 'nowrap',
            }}
          >
            掃除場所別の回数グラフ
          </Typography>
          <div style={{ height: '400px' }}>
            <Bar data={data} options={options} />
          </div>
        </StyledCardContent>
      </StyledCard>
    </div>
  );
}
