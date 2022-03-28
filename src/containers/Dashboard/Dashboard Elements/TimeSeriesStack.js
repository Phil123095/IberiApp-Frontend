import React from 'react';
/*import Info from '../../utils/Info';*/
import BarChartStack from '../Dashboard Graphs/CHART_TSBarStack';
import { formatPriorityCodes, return_color, color_picker } from '../../../utils/general_utils.js';


function TimeSeriesStackGeneral(props) {
  const prios_Indicator = props.prio_bool;

  function set_ordering(totals) {
    let ordering = {};
    if (totals !== null) {
      console.log(totals)

      totals.forEach((element, index, array) => {
        const name = element.name
        ordering[name] = index + 1
      })
      return ordering;
    }
    return ordering;
  }

  function prepare_data(in_data, order_to_use) {
    const time_labels = in_data.clean_date;
    delete in_data['clean_date'];

    const data_set = Object.entries(in_data).map(([key, value], index) => {
      if (prios_Indicator === true) {
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
      } else {
        const colors_out = color_picker(index)
        const order = order_to_use.key
        console.log("ORDER")
        console.log(order);
        return(
          {
            label: key,
            data: value,
            backgroundColor: colors_out.bg_color,
            hoverBackgroundColor: colors_out.hv_bg_color,
            barPercentage: 0.8,
            categoryPercentage: 1,
            order: order,
          }
        );

      }
    })

    const chartData = {
      labels: time_labels,
      datasets: data_set,
    };

    return chartData
  }

  const totals = props.totals

  const order_to_use = set_ordering(totals)
  console.log(order_to_use)
  const final_data = prepare_data(props.TS_data, order_to_use)

  return (
    <div>
      <header className="px-3 py-2 flex items-center">
        <h2 className="text-sm font-semibold text-slate-400 uppercase">{props.title}</h2>
      </header>
      <div className="grow">
        <BarChartStack data={final_data} granularity={props.granularity} width={400} height={300} />
      </div>
    </div>
  );
}

export default TimeSeriesStackGeneral;




