import React, { useRef, useEffect } from 'react';

import {
  Chart, BarController, BarElement, LinearScale,  CategoryScale, Tooltip, Legend
} from 'chart.js';

import 'chartjs-adapter-moment';

// Import utilities
/*import {formatValue} from '../../utils/tw_utils';*/

Chart.register(BarController, BarElement, LinearScale, CategoryScale, Tooltip, Legend);

function BarChartPercStack({
  data,
  width,
  height
}) {

  const canvas = useRef(null);
  /*const legend = useRef(null);*/

  useEffect(() => {
    const ctx = canvas.current;
    // eslint-disable-next-line no-unused-vars
    const chart = new Chart(ctx, {
        type: 'bar',
        data: data,
        options: {
            scales: {
              y: {
                stacked: true,
                max: 100,
                min: 0,
                grid: {
                  display: false,
                  drawBorder: false,
                },
              },
              x: {
                stacked: true,
                grid: {
                  display: false,
                  drawBorder: false,
                },
              },
            },
        }
    
    });
    return () => chart.destroy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      {/*<div className="px-5 py-3">
        <ul ref={legend} className="flex flex-wrap"></ul>
        </div>*/}
        <canvas ref={canvas} width={width} height={height}></canvas>
    </React.Fragment>
  );
}

export default BarChartPercStack;