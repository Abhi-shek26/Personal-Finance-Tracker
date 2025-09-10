import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const ExpenseChart = ({ transactions }) => {
    const expenseData = transactions
        .filter(t => t.amount < 0)
        .reduce((acc, transaction) => {
            const category = transaction.category;
            const amount = Math.abs(transaction.amount);
            acc[category] = (acc[category] || 0) + amount;
            return acc;
        }, {});

    const chartData = {
        labels: Object.keys(expenseData),
        datasets: [
            {
                label: 'Expenses by Category',
                data: Object.values(expenseData),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.7)',
                    'rgba(54, 162, 235, 0.7)',
                    'rgba(255, 206, 86, 0.7)',
                    'rgba(75, 192, 192, 0.7)',
                    'rgba(153, 102, 255, 0.7)',
                    'rgba(255, 159, 64, 0.7)',
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
    };

    return (
        <div className="bg-white p-4" style={{ maxWidth: '400px', margin: 'auto' }}>
            <h3 className="text-xl font-bold text-center mb-4">Expense Breakdown</h3>
            <Pie data={chartData} />
        </div>
    );
};

export default ExpenseChart;
