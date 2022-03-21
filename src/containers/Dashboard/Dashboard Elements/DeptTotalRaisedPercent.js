import React from 'react';
import TotalIncidentsBar from '../Dashboard Graphs/TotalIncidentsBar.js';
import {tailwindConfig} from '../../../utils/tw_utils';

// Import utilities

function TotalRaisedDepartmentPerc(props) {
    const summary_data = props.total_raised_dept; 

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

    const data_set = summary_data.map((item, index) => {
        console.log(item, index)
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
      })
    console.log(data_set)

    const chartData = {
    labels: ['Department'],
    datasets: data_set
    };

  return (
    <div>
      <header className="px-2 py-2">
        <h2 className="text-sm font-semibold text-slate-400 uppercase">{props.heading}</h2>
      </header>
      {/*<div className="px-2 py-1">
        <div className="flex items-start">
          <div className="text-2xl font-bold text-slate-800 mr-2">Total Incidents: 21000</div>
        </div>
      </div>*/}
      {/* Chart built with Chart.js 3 */}
      <div class="grow-0">
        {/* Change the height attribute to adjust the chart height */}
        <TotalIncidentsBar data={chartData} total_incidents={null} width={595} height={48} />
      </div>
    </div>
  );
}

export default TotalRaisedDepartmentPerc;
