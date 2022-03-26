import TimeSeriesStackGeneral from "../Dashboard Elements/TimeSeriesStack";
import SummaryHorizontalBar from '../Dashboard Elements/SummaryHorizontalPerc';


function ExecSummSection(props) {
    const summary_data = props.summary_data;
    const raised_TS_prio = props.raised_TS_prio;
    const granularity = props.granularity
    return (
        <>
            <div class="bg-white p-3 rounded col-span-4 border-slate-200 shadow-sm">
                <SummaryHorizontalBar summary_data={summary_data} display_total={true} heading={"Summary of Raised Incidents"}/>
            </div>
            <div class="bg-white p-3 rounded col-span-8 border-slate-200 shadow-sm">
                <TimeSeriesStackGeneral prio_bool={true} TS_data={raised_TS_prio} granularity={granularity} title={"Total Incidents Raised by Priority over time"}/>
            </div>
        </>

    )
}

export default ExecSummSection;