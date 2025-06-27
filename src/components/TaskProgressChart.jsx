import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const TaskProgressChart = ({ completed, pending }) => {
  const data = {
    labels: ['Completed', 'Pending'],
    datasets: [
      {
        data: [completed, pending],
        backgroundColor: ['#10b981', '#f43f5e'],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    cutout: '70%',
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };

  return <Doughnut data={data} options={options} />;
};

export default TaskProgressChart;