import { useRef, useEffect } from 'react';

import {
  Chart, BarController, BarElement, LinearScale, TimeScale, Tooltip, Legend, LogarithmicScale,
} from 'chart.js';
import 'chartjs-adapter-moment';

// Import utilities


Chart.register(BarController, BarElement, LinearScale, TimeScale, LogarithmicScale, Tooltip, Legend);

function BarChartStack({
  data,
  granularity,
  width,
  height
}) {

  const canvas = useRef(null);

  useEffect(() => {
    const ctx = canvas.current;
    // eslint-disable-next-line no-unused-vars
    const chart = new Chart(ctx, {
      type: 'bar',
      data: data,
      options: {
        layout: {
          padding: {
            top: 12,
            bottom: 16,
            left: 20,
            right: 20,
          },
        },
        scales: {
          y: {
            stacked: true,
            grid: {
              drawBorder: false,
            },
            beginAtZero: true,
          },
          x: {
            stacked: true,
            type: 'time',
            time: {
              parser: 'DD-MM-YYYY',
              unit: granularity,
              displayFormats: {
                day: "MMM DD",
                week: "MMM DD",
                month: "MMMM YY",
              }
            },
            grid: {
              display: false,
              drawBorder: false,
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              title: () => false, // Disable tooltip title
            },
          },
        },
        interaction: {
          intersect: false,
          mode: 'nearest',
        },
        animation: {
          duration: 200,
        },
        maintainAspectRatio: false,
        resizeDelay: 200,
      },
    });
    return () => chart.destroy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <canvas ref={canvas} width={width} height={height}></canvas>
  );
}

export default BarChartStack;