import React, { useRef, useEffect } from 'react';

import {
  Chart, BarController, BarElement, LinearScale, CategoryScale, Tooltip, Legend,
} from 'chart.js';
import 'chartjs-adapter-moment';

// Import utilities
import { tailwindConfig } from '../../../utils/tw_utils.js';

Chart.register(BarController, BarElement, LinearScale, CategoryScale, Tooltip, Legend);

function TotalIncidentsBar({
  data,
  total_incidents,
  width,
  height
}) {
    console.log(data);
  const canvas = useRef(null);
  const legend = useRef(null);

  useEffect(() => {
    
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const values = data.datasets.map(x => x.data.reduce(reducer));
    const max = total_incidents !== null ? total_incidents : values.reduce(reducer)

    // Calculate sum of values
    /*const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const values = data.datasets.map(x => x.data.reduce(reducer));*/


    const ctx = canvas.current;
    // eslint-disable-next-line no-unused-vars
    const chart = new Chart(ctx, {
      type: 'bar',
      data: data,
      options: {
        indexAxis: 'y',
        layout: {
          padding: {
            top: 12,
            bottom: 12,
            left: 10,
            right: 10,
          },
        },
        scales: {
          x: {
            stacked: true,
            display: false,
            max: max,
          },
          y: {
            stacked: true,
            display: false,
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              title: () => false, // Disable tooltip title
              label: (context) => context.parsed.x,
            },
          },
        },
        interaction: {
          intersect: false,
          mode: 'nearest'
        },
        animation: {
          duration: 500,
        },
        maintainAspectRatio: false,
        resizeDelay: 200,
      },
      plugins: [{
        id: 'htmlLegend',
        afterUpdate(c, args, options) {
          const ul = legend.current;
          if (!ul) return;
          // Remove old legend items
          while (ul.firstChild) {
            ul.firstChild.remove();
          }
          // Reuse the built-in legendItems generator
          const items = c.options.plugins.legend.labels.generateLabels(c);
          items.forEach((item) => {
            const li = document.createElement('li');
            li.style.display = 'flex';
            li.style.justifyContent = 'space-between';
            li.style.alignItems = 'center';
            li.style.paddingTop = tailwindConfig().theme.padding[2.5];
            li.style.paddingBottom = tailwindConfig().theme.padding[2.5];
            const wrapper = document.createElement('div');
            wrapper.style.display = 'flex';
            wrapper.style.alignItems = 'center';
            const box = document.createElement('div');
            box.style.width = tailwindConfig().theme.width[3];
            box.style.height = tailwindConfig().theme.width[3];
            box.style.borderRadius = tailwindConfig().theme.borderRadius.sm;
            box.style.marginRight = tailwindConfig().theme.margin[3];
            box.style.backgroundColor = item.fillStyle;
            const label = document.createElement('div');
            const value = document.createElement('div');
            value.style.fontWeight = tailwindConfig().theme.fontWeight.medium;
            value.style.marginLeft = tailwindConfig().theme.margin[3];
            value.style.color = item.text === 'Other' ? tailwindConfig().theme.colors.slate[400] : item.fillStyle;
            const theValue = c.data.datasets[item.datasetIndex].data.reduce((a, b) => a + b, 0);
            const valueText = document.createTextNode(`${parseInt(theValue)} - ${parseFloat(theValue / max * 100).toFixed(2)}%`);
            const labelText = document.createTextNode(item.text);
            console.log("ITEM TEXT: ", labelText);
            value.appendChild(valueText);
            label.appendChild(labelText);
            ul.appendChild(li);
            li.appendChild(wrapper);
            li.appendChild(value);
            wrapper.appendChild(box);
            wrapper.appendChild(label);
          });
        },
      }],
    });
    return () => chart.destroy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div>
        <canvas ref={canvas} width={width} height={height}></canvas>
      </div>
      <div className="px-3 pt-2 my-2 overflow-scroll max-h-44">
        <ul ref={legend} className="text-md divide-y divide-slate-100"></ul>
        <ul className="text-sm divide-y divide-slate-100"></ul>
      </div>
    </div>
  );
}

export default TotalIncidentsBar;