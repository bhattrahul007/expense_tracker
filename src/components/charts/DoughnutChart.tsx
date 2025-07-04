import { INCOME_CATEGORY } from '../../constants/categories';
import React, { useEffect, useRef } from 'react';
import type { Expense } from '../types';
import * as Chart from 'chart.js';
import { Typography } from '@mui/material';

// Register Chart.js components
Chart.Chart.register(
  Chart.ArcElement,
  Chart.Tooltip,
  Chart.Legend,
  Chart.Title,
  Chart.DoughnutController // This was missing!
);

export const DoughnutChart = React.memo(({ expenseData }: { expenseData: Expense[] }) => {
  const doughnutChartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<Chart.Chart | null>(null);

  useEffect(() => {
    const canvas = doughnutChartRef.current;
    if (!canvas) return;

    if (!expenseData || expenseData.length === 0) {
      const doughnutCtx = canvas.getContext('2d');
      if (!doughnutCtx) return;

      // Create empty state chart
      chartInstanceRef.current = new Chart.Chart(doughnutCtx, {
        type: 'doughnut',
        data: {
          labels: ['No Data'],
          datasets: [
            {
              data: [1],
              backgroundColor: ['#E5E7EB'],
              borderWidth: 2,
              borderColor: '#fff',
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: 'Income vs Expenses Overview',
            },
            legend: {
              display: false,
            },
            tooltip: {
              enabled: false,
            },
          },
        },
      });
      return;
    }

    const income = expenseData.filter(item => item.category === INCOME_CATEGORY);
    const expenses = expenseData.filter(item => item.category !== INCOME_CATEGORY);
    const totalIncome = income.reduce((sum, item) => sum + item.amount, 0);
    const totalExpenses = expenses.reduce((sum, item) => sum + item.amount, 0);
    const remaining = totalIncome - totalExpenses;

    const doughnutCtx = canvas.getContext('2d');
    if (!doughnutCtx) return;

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    chartInstanceRef.current = new Chart.Chart(doughnutCtx, {
      type: 'doughnut',
      data: {
        labels: ['Income', 'Expenses', 'Remaining'],
        datasets: [
          {
            data: [totalIncome, totalExpenses, remaining],
            backgroundColor: ['#4BC0C0', '#FF6384', '#FFCE56'],
            borderWidth: 2,
            borderColor: '#fff',
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Income vs Expenses Overview',
          },
          legend: {
            position: 'bottom',
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                const label = context.label || '';
                const value = context.parsed;
                return `${label}: ₹${value.toLocaleString()}`;
              },
            },
          },
        },
      },
    });
  }, [expenseData]);

  useEffect(() => {
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, []);

  return (
    <div className="flex flex-col items-center max-w-[400px]">
      <div className="bg-white rounded-lg w-full h-full shadow-none">
        <canvas ref={doughnutChartRef} width="400" height="200"></canvas>
      </div>
      {(!expenseData || expenseData.length === 0) && (
        <Typography align="center" className="subtitle" variant="body1">
          No Data Available
        </Typography>
      )}
    </div>
  );
});

DoughnutChart.displayName = 'DoughnutChart';

export default DoughnutChart;
