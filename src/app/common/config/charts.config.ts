import { ChartConfiguration } from 'chart.js';
import { dateTimeFormatOptions } from './locale.config';

export const pieChartOptions: ChartConfiguration['options'] = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        padding: 20,
      },
    },
    datalabels: {
      formatter: (value: number, ctx) => {
        const datapoints = ctx.chart.data.datasets[0].data;
        const totalCount = datapoints.reduce(
          (total: number, datapoint: number) => total + datapoint,
          0,
        );
        const percentage = (value / +totalCount) * 100;
        return percentage.toFixed(2) + '%';
      },
      color: '#FFFF',
    },
  },
};

export const barChartOptions: ChartConfiguration['options'] = {
  responsive: true,
  scales: {
    x: {
      display: true,
    },
    y: {
      display: false,
    },
  },
  plugins: {
    tooltip: {
      callbacks: {
        title: function (titleItems) {
          return new Date(titleItems[0].label).toLocaleDateString(
            'es-PE',
            dateTimeFormatOptions,
          );
        },
      },
    },
    legend: {
      position: 'bottom',
      labels: {
        padding: 20,
      },
      //  display: window.innerWidth < 700 ? false : true,
    },
    datalabels: {
      color: '#FFFF',
    },
  },
};

export const polarChartOptions: ChartConfiguration['options'] = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        padding: 20,
      },
    },
    datalabels: {
      color: '#FFFF',
    },
  },
};

export const labels: string[] = ['Faltas', 'Puntual', 'Tarde', 'Licencia'];
