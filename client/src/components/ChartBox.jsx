import { Line } from 'react-chartjs-2';
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function ChartBox({ data }) {
  if (!data || data.length === 0) {
    return <div className="text-gray-400">No data available</div>;
  }

  // Dynamically extract keys (excluding 'date')
  const valueKeys = Object.keys(data[0]).filter((k) => k !== 'date');
  const labels = data.map((item) => item.date);
  const colors = [
    '#2563EB', // blue
    '#22C55E', // green
    '#F59E42', // orange
    '#EF4444', // red
    '#A21CAF', // purple
    '#FACC15', // yellow
  ];

  const datasets = valueKeys.map((key, idx) => ({
    label: key,
    data: data.map((item) => item[key]),
    borderColor: colors[idx % colors.length],
    backgroundColor: colors[idx % colors.length] + '33', // add alpha for bg
    fill: false,
  }));

  const chartData = {
    labels,
    datasets,
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false,
      },
    },
  };

  return <Line data={chartData} options={options} />;
}
