import TableIncidentsPrio from '../Dashboard Elements/Table_Prio_Incidents';
import TimeSeriesStackGeneral from '../Dashboard Elements/TimeSeriesStack';
import SummaryHorizontalBar from '../Dashboard Elements/SummaryHorizontalPerc';


function RootCauseSection(props) {
    const APIdata_total_raised = props.total_raised_data;
    const APIdata_raised_TS = props.total_raised_TS;
    const title_prop = props.viz_title;
    const granularity = props.granularity;

    return (
        <>
            <div class="bg-white p-3 rounded col-span-4 border-slate-200 shadow-sm">
                <SummaryHorizontalBar summary_data={APIdata_total_raised} display_total={false} heading={"Incidents Raised by " + title_prop}/>
            </div>
            <div class="bg-white p-3 rounded col-span-8 border-slate-200 shadow-sm">
                <TableIncidentsPrio total_raised_data={APIdata_total_raised} heading={"Total Incidents Raised by " + title_prop} col_title={title_prop + " Name"}/>
            </div>
            <div class="bg-white p-3 rounded col-span-12 border-slate-200 shadow-sm">
                <TimeSeriesStackGeneral prio_bool={false} TS_data={APIdata_raised_TS} totals={APIdata_total_raised} granularity={granularity} title={"Total Incidents Raised by " + title_prop + " over time"}/>
            </div>
        </>

    )
}

export default RootCauseSection;