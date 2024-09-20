import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

// Register chart elements and plugin
Chart.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const CustReport = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: '# of Complaints',
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
    const fetchCustomerData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/getAllComplaint');
        const data = response.data;

        // Prepare data for the chart
        const customerEmails = data.map((complaint) => complaint.CustEmail.CustEmail);
        const emailCounts = {};
        
        customerEmails.forEach(email => {
          emailCounts[email] = (emailCounts[email] || 0) + 1;
        });

        const labels = Object.keys(emailCounts);
        const counts = Object.values(emailCounts);

        setChartData({
          labels: labels,
          datasets: [
            {
              label: '# of Complaints',
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
      } catch (error) {
        console.error('Error fetching customer data:', error);
      }
    };

    fetchCustomerData();
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
        color: (context) => context.dataset.backgroundColor[context.black],
        font: {
          weight: 'bold',
        },
      },
    },
  };

  return (
    <div>
      <h2>Customers Report based on complaints</h2>
      {chartData.labels.length > 0 ? (
        <div style={{ width: '400px', height: '400px' }}>
          <Pie data={chartData} options={options}/>
        </div>
      ) : (
        <p>No data available for the pie chart.</p>
      )}
    </div>
  );
};

export default CustReport;
