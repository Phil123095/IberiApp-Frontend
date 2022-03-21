import React from 'react';
import TotalIncidentsBar from '../Dashboard Graphs/TotalIncidentsBar.js';

// Import utilities
import { formatPriorityCodes, return_color } from '../../../utils/tw_utils.js';

function TotalRaisedPerc(props) {
    const summary_data = props.summary_data; 
    const total_incidents = summary_data.shift(0);
    console.log(total_incidents)

    const data_set = summary_data.map((item, index) => {
        console.log(item, index)
        const colors_out = return_color(item.key)
        const prio_code_clean = formatPriorityCodes(item.key);
        const label = prio_code_clean.format_code;
        const order = prio_code_clean.order;
        console.log(colors_out)
        return(
        {
            label: label,
            data: [item.value],
            backgroundColor: colors_out.bg_color,
            hoverBackgroundColor: colors_out.hv_bg_color,
            barPercentage: 1,
            categoryPercentage: 1,
            order: order,
        }
            
        );
      })
    console.log(data_set)

    const chartData = {
    labels: ['Reasons'],
    datasets: data_set
    };

  return (
    <div>
      <header className="px-2 py-2">
        <h2 className="text-sm font-semibold text-slate-400 uppercase">Summary of Raised Incidents</h2>
      </header>
      <div className="px-2 py-1">
        <div className="flex items-start">
          <div className="text-2xl font-bold text-slate-800 mr-2">Total Incidents: {total_incidents.value}</div>
        </div>
      </div>
      {/* Chart built with Chart.js 3 */}
      <div className="grow">
        {/* Change the height attribute to adjust the chart height */}
        <TotalIncidentsBar data={chartData} total_incidents={total_incidents.value} width={595} height={48} />
      </div>
    </div>
  );
}

export default TotalRaisedPerc;