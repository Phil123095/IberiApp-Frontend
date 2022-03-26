import BarChartMTTR from '../Dashboard Elements/BarChartMTTR';
import BarChartSLAPerc from '../Dashboard Elements/BarChartPercSLA';


function MttrSlaSection(props) {
    
    return (
        <>
            <div class="bg-white p-3 rounded col-span-6 border-slate-200 shadow-sm">
                <BarChartMTTR mttr_data={props.mttr_data}/>
            </div>
            <div class="bg-white p-3 rounded col-span-6 border-slate-200 shadow-sm">
                <BarChartSLAPerc mttr_data_perc={props.mttr_data_perc}/>
            </div>
        </>

    )
}

export default MttrSlaSection;