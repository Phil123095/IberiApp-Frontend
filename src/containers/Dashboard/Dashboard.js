import {useEffect, useState} from 'react';
import FilterBar from './Dashboard Elements/FilterBar'
/*import SummaryWidget from './Dashboard Elements/SummaryWidget_Tbl';*/
import axios from 'axios';
import TotalRaisedTS from './Dashboard Elements/TotalRaisedTS';
import StackBarPrios from './Dashboard Elements/StackedBar';
import BarChartMTTR from './Dashboard Elements/BarChartMTTR';
import BarChartSLAPerc from './Dashboard Elements/BarChartPercSLA';
import TotalRaisedPerc from './Dashboard Elements/BarTotalRaisedPerc';
import TotalRaisedDepartmentPerc from './Dashboard Elements/DeptTotalRaisedPercent';
import TableIncidentsPrio from './Dashboard Elements/Table_Prio_Incidents';
import StackBarGeneral from './Dashboard Elements/TimeSeriesStack';

function FinalDashboard(props) {
    const [isLoading, setIsLoading] = useState(true);
    const [APIdata, setAPIData] = useState(null);
    const token = props.token
    const setToken = props.setToken

    useEffect(() => {
        axios({
            method: "POST",
            url: "https://lve3zx38hg.execute-api.eu-central-1.amazonaws.com/dev/backend/raised-incidents",
            headers: {
                Authorization: 'Bearer ' + token
            },
            data:{
                start_date: '2021-01-01',
                end_date: '2021-04-01',
                customer_group: ['IBERIA']
            }
        })
        .then(response => {
            const result = response.data
            if (result.access_token) {
                setToken(result.access_token)
            }
            setAPIData(result)
        })
    }, [token, setToken])

    useEffect(() => {
        if (APIdata !== null){
            setIsLoading(false)
        }
    }, [APIdata])

    const getDataFromAPI = (inputs) => {
        console.log(inputs)
        const {minDate, maxDate, selectedGroup} = inputs
        setIsLoading(true)
        axios({
            method: "POST",
            url: "/raised-incidents",
            headers: {
                Authorization: 'Bearer ' + token
            },
            data:{
                start_date: minDate,
                end_date: maxDate,
                customer_group: selectedGroup
            }
        })
        .then(response => {
            const result = response.data
            if (result.access_token) {
                setToken(result.access_token)
            }
            setAPIData(result)
        })

    }

    function return_loaded() {
        console.log(APIdata);
        return (
            <div class="h-full m grid grid-cols-12 grid-rows-6 gap-4 px-3">
                <div class="bg-white p-3 rounded col-span-4 border-slate-200 shadow-sm">
                    <TotalRaisedPerc summary_data={APIdata.summary_data}/>
                </div>
                <div class="bg-white p-3 rounded col-span-8 border-slate-200 shadow-sm">
                    <StackBarPrios TS_data={APIdata.raised_TS_prio} className="Actual-Graph"/>
                </div>
                <div class="bg-white p-3 rounded col-span-6 border-slate-200 shadow-sm">
                    <BarChartMTTR mttr_data={APIdata.mttr_data}/>
                </div>
                <div class="bg-white p-3 rounded col-span-6 border-slate-200 shadow-sm">
                    <BarChartSLAPerc mttr_data_perc={APIdata.mttr_perc}/>
                </div>
                <div class="bg-white p-3 rounded col-span-12 border-slate-200 shadow-sm">
                    <TotalRaisedTS in_data={APIdata.all_raised_data} className="Actual-Graph"/>
                </div>
                <div class="bg-white p-3 rounded col-span-4 border-slate-200 shadow-sm">
                    <TotalRaisedDepartmentPerc total_raised_dept={APIdata.department_raised_totals} heading={"Incidents Raised by Department"}/>
                </div>
                <div class="bg-white p-3 rounded col-span-8 border-slate-200 shadow-sm">
                    <TableIncidentsPrio total_raised_data={APIdata.department_raised_totals} heading={"Total Incidents Raised by Department"} col_title={"Department Name"}/>
                </div>
                <div class="bg-white p-3 rounded col-span-12 border-slate-200 shadow-sm">
                    <StackBarGeneral TS_data={APIdata.department_raised_TS}/>
                </div>
                <div class="bg-white p-3 rounded col-span-4 border-slate-200 shadow-sm">
                    <TotalRaisedDepartmentPerc total_raised_dept={APIdata.cause_raised_total} heading={"Incidents Raised by Cause"}/>
                </div>
                <div class="bg-white p-3 rounded col-span-8 border-slate-200 shadow-sm">
                    <TableIncidentsPrio total_raised_data={APIdata.cause_raised_total} heading={"Total Incidents Raised by Cause"} col_title={"Incident Cause"}/>
                </div>
                <div class="bg-white p-3 rounded col-span-12 border-slate-200 shadow-sm">
                    <StackBarGeneral TS_data={APIdata.cause_raised_TS}/>
                </div>
            </div>
        );
    }

    function returnLoading() {
        return (
            <div class="flex col min-w-full min-h-full justify-center align-center">
                <div class="my-96 flex flew-col items-center">
                    <div class="flex flex-row items-center">
                        <svg role="status" class="inline mr-2 w-10 h-10 text-gray-200 animate-spin fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                        </svg>
                        <h1 class="text-2xl font-bold">Give us a sec, ok?</h1>
                    </div>
                    <a href="https://www.youtube.com/watch?v=dXg1ZB0NjEM" target="_blank" rel="noreferrer" class="ml-2 text-xs underline">Click me</a>
                </div>
            </div>
        )
    }

    return (
        <div class="bg-slate-100 min-h-screen min-w-full flex flex-col">
            <FilterBar getDataFromAPI={getDataFromAPI}/>
            {isLoading === true ? returnLoading() : return_loaded()}
        </div>
    )
}

export default FinalDashboard;