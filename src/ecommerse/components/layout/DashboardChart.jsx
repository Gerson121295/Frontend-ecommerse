

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const DashboardChart = () => {
  const data = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Ingresos',
        data: [12000, 15000, 11000, 18000, 21000, 25000],
        borderColor: '#6c3483',
        backgroundColor: 'rgba(108, 52, 131, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: '#6c3483',
        },
      },
    },
    scales: {
      x: {
        ticks: { color: '#6c3483' },
      },
      y: {
        ticks: { color: '#6c3483' },
      },
    },
  };

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <h5 className="card-title fw-bold mb-4" style={{ color: '#6c3483' }}>
          Ingresos anuales
        </h5>
        <Line data={data} options={options} height={100} />
      </div>
    </div>
  );
};





