import React from 'react';
import TotalIncidentsBar from '../Dashboard Graphs/CHART_HorizPercStack.js';

// Import utilities
import { formatPriorityCodes, return_color, color_picker } from '../../../utils/general_utils.js';

function SummaryHorizontalBar(props) {

    const display_total = props.display_total;


    function prepare_data(in_data) {
      let total_incidents = null

      if (display_total === true) {
        const total_incidents_temp = in_data.shift(0);
        total_incidents = total_incidents_temp.value
      }

      const data_set = in_data.map((item, index) => {

        if (display_total === true) {
          const colors_out = return_color(item.key)
          const prio_code_clean = formatPriorityCodes(item.key);
          const label = prio_code_clean.format_code;
          const order = prio_code_clean.order;

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
        } else {

          const label = item.name;
          const colors_out = color_picker(index)

          return(
            {
              label: label,
              data: [item.total_incidents],
              backgroundColor: colors_out.bg_color,
              hoverBackgroundColor: colors_out.hv_bg_color,
              barPercentage: 1,
              categoryPercentage: 1,
            }
          );

        }
      })

      const chartData = {
        labels: ['Reasons'],
        datasets: data_set
        };

      return {total_incidents, chartData}

    }

  function displayWithTotal() {
    const {total_incidents, chartData} = prepare_data(props.summary_data)
    return (
      <>
        <header className="px-2 py-2">
          <h2 className="text-sm font-semibold text-slate-400 uppercase">{props.heading}</h2>
        </header>
        <div className="px-2 py-1">
          <div className="flex items-start">
            <div className="text-2xl font-bold text-slate-800 mr-2">Total Incidents: {total_incidents}</div>
          </div>
        </div>
        {/* Chart built with Chart.js 3 */}
        <div className="grow">
          {/* Change the height attribute to adjust the chart height */}
          <TotalIncidentsBar data={chartData} total_incidents={total_incidents} width={595} height={48} />
        </div>
      </>
    );
  }

  function displayNoTotal() {
    const {total_incidents, chartData} = prepare_data(props.summary_data)
    return (
      <>
        <header className="px-2 py-2">
          <h2 className="text-sm font-semibold text-slate-400 uppercase">{props.heading}</h2>
        </header>
        <div class="grow-0">
          {/* Change the height attribute to adjust the chart height */}
          <TotalIncidentsBar data={chartData} total_incidents={total_incidents} width={595} height={48} />
        </div>
      </>
    );
  }

  return (
    <div>
      {display_total === true ? displayWithTotal() : displayNoTotal()}
    </div>
  );
}

export default SummaryHorizontalBar;