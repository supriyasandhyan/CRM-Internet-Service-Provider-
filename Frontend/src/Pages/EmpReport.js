import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

// Register chart elements and plugin
Chart.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const EmpReport = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: '# of Employees',
        data: [],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/employee-locations');
        const data = response.data;

        if (Array.isArray(data) && data.length > 0) {
          const labels = data.map((item) => item._id);
          const counts = data.map((item) => item.count);

          setChartData({
            labels: labels,
            datasets: [
              {
                label: '# of Employees',
                data: counts,
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
              },
            ],
          });
        } else {
          console.error('No valid data received:', data);
        }
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };

    fetchEmployeeData();
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      datalabels: {
        formatter: (value, context) => {
          const total = context.chart.data.datasets[0].data.reduce((acc, val) => acc + val, 0);
          const percentage = ((value / total) * 100).toFixed(2) + '%';
          return percentage;
        },
        color: (context) => {
          // Set the color of the percentage label
          return context.dataset.backgroundColor[context.black]; 
        },
        font: {
          weight: 'bold', // Optional: make the font bold
        },
      },
    },
  };

  return (
    <div>
      <h2>Employee Report</h2>
      {chartData.labels.length > 0 ? (
        <div style={{ width: '400px', height: '400px' }}>
          <Pie data={chartData} options={options} />
        </div>
      ) : (
        <p>No data available for the pie chart.</p>
      )}
    </div>
  );
};

export default EmpReport;
