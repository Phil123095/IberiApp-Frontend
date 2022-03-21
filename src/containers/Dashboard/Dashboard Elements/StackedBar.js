import React from 'react';
/*import Info from '../../utils/Info';*/
import BarChartStack from '../Dashboard Graphs/BarStack01';

// Import utilities
import {return_color, formatPriorityCodes} from '../../../utils/tw_utils';

function StackBarPrios(props) {
  const timeseries_data = props.TS_data; 
  console.log("TS DATA HERE");
  console.log(timeseries_data);

  const time_labels = timeseries_data.clean_date;
  delete timeseries_data['clean_date'];

  const data_set = Object.entries(timeseries_data).map(([key, value]) => {
    const colors_out = return_color(key)
    const prio_code_clean = formatPriorityCodes(key)
    return(
    {
      label: prio_code_clean.format_code,
      data: value,
      backgroundColor: colors_out.bg_color,
      hoverBackgroundColor: colors_out.hv_bg_color,
      barPercentage: 0.9,
      categoryPercentage: 0.66,
      order: prio_code_clean.order,
    }
        
    );
  })

  const chartData = {
    labels: time_labels,
    datasets: data_set,
  };

  return (
    <div>
      <header className="px-3 py-2 flex items-center">
        <h2 className="text-sm font-semibold text-slate-400 uppercase">Raised by Priority over Time</h2>
      </header>
      <div className="grow">
        {/* Change the height attribute to adjust the chart height */}
        <BarChartStack data={chartData} width={400} height={300} />
      </div>
    </div>
  );
}

export default StackBarPrios;