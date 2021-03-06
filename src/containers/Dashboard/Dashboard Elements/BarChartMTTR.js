
// Import utilities
import { tailwindConfig } from '../../../utils/general_utils.js';
import MTTRBarChart from '../Dashboard Graphs/CHART_BarMTTR.js';

function BarChartMTTR(props) {
    const mttr_data = props.mttr_data

    const chartData = {
        labels: mttr_data.labels,
        datasets: [
        // Light blue bars
        {
            label: 'SLA Met',
            data: mttr_data.SLA_met_vals,
            backgroundColor: tailwindConfig().theme.colors.blue[400],
            hoverBackgroundColor: tailwindConfig().theme.colors.blue[500],
            barPercentage: 0.9,
            categoryPercentage: 0.9,
        },
        // Blue bars
        {
            label: 'SLA not Met',
            data: mttr_data.SLA_not_met_vals,
            backgroundColor: tailwindConfig().theme.colors.indigo[500],
            hoverBackgroundColor: tailwindConfig().theme.colors.indigo[600],
            barPercentage: 0.9,
            categoryPercentage: 0.9,
        },
        ],
    };

  return (
    <div>
      <header className="px-3 py-2">
        <h2 className="text-sm font-semibold text-slate-400 uppercase">Mean Time to Resolution for SLAs Met and Not Met (in hours)</h2>
      </header>
      {/* Chart built with Chart.js 3 */}
      {/* Change the height attribute to adjust the chart height */}
      <div class="grow mt-4">
        <MTTRBarChart data={chartData} width={595} height={248}/>
      </div>
    </div>
  );
}

export default BarChartMTTR;
