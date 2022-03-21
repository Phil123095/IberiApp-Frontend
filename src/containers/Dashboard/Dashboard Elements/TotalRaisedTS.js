/*import LineChart01 from './LineChart01';*/
import {tailwindConfig} from '../../../utils/tw_utils';
import BarChartFinal from '../Dashboard Graphs/BarChartFinal';



function TotalRaisedTS(props) {
    const RaisedData = props.in_data;

    if (RaisedData) {
        const chartData = {
            labels: RaisedData.clean_date,
            datasets: [
            // Indigo line
            {
                data: RaisedData.total_raised,
                backgroundColor: tailwindConfig().theme.colors.indigo[500],
                hoverBackgroundColor: tailwindConfig().theme.colors.indigo[600],
                barPercentage: 0.66,
                categoryPercentage: 0.66,
              }/*,
            // Gray line
            {
                data: [
                532, 532, 532, 404, 404, 314, 314,
                314, 314, 314, 234, 314, 234, 234,
                314, 314, 314, 388, 314, 202, 202,
                202, 202, 314, 720, 642,
                ],
                borderColor: tailwindConfig().theme.colors.slate[300],
                borderWidth: 2,
                tension: 0,
                pointRadius: 0,
                pointHoverRadius: 3,
                pointBackgroundColor: tailwindConfig().theme.colors.slate[300],
                clip: 20,
            },*/
            ],
        };

        return (
            <div>
                <header class="px-3 py-2 flex items-center">
                    <h2 class="text-sm font-semibold text-slate-400 uppercase">Incidents Raised over Time. Stacked by Priority</h2>
                </header>
                <div class="grow">
                    {/*<LineChart01 data={chartData} width={389} height={256} />*/}
                    <BarChartFinal data={chartData} width={400} height={300} />
                </div>
            </div>

        )
    } 
        return(<div><h2>Loading Data</h2></div>)

}

export default TotalRaisedTS;