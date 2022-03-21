import React from 'react';
/*import Info from '../../utils/Info';*/
import BarChartStack from '../Dashboard Graphs/BarStack01';
import {tailwindConfig} from '../../../utils/tw_utils';


function StackBarGeneral(props) {
  const timeseries_data = props.TS_data; 
  console.log("TS DATA HERE");
  console.log(timeseries_data);

  const time_labels = timeseries_data.clean_date;
  delete timeseries_data['clean_date'];

  const color_picker = (index) => {
    const colors = {}
    if (index <= 7) {
      const bg_shade = 200 + (100 * index)
      colors.bg_color = tailwindConfig().theme.colors.indigo[bg_shade]
      colors.hv_bg_color = tailwindConfig().theme.colors.indigo[bg_shade + 100]
    }
    else if (index > 7 && index <= 15) {
      const bg_shade = 200 + (100 * (index-7))
      colors.bg_color = tailwindConfig().theme.colors.blue[bg_shade]
      colors.hv_bg_color = tailwindConfig().theme.colors.blue[bg_shade + 100]
    }
    else {
      colors.bg_color = tailwindConfig().theme.colors.purple[600]
      colors.hv_bg_color = tailwindConfig().theme.colors.purple[700]
    }

    return colors
  
  }

  const data_set = Object.entries(timeseries_data).map(([key, value], index) => {
    const colors_out = color_picker(index)
    return(
    {
      label: key,
      data: value,
      backgroundColor: colors_out.bg_color,
      hoverBackgroundColor: colors_out.hv_bg_color,
      barPercentage: 0.8,
      categoryPercentage: 1,
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
        <h2 className="text-sm font-semibold text-slate-400 uppercase">Raised by Cause Over Time</h2>
      </header>
      <div className="grow">
        {/* Change the height attribute to adjust the chart height */}
        <BarChartStack data={chartData} width={400} height={300} />
      </div>
    </div>
  );
}

export default StackBarGeneral;