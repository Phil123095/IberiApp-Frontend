import { useState} from 'react';
import Select from 'react-select'


function FilterBar(props) {
    const [selectedDate, setSelectedDate] = useState(['2021-01-01', '2021-01-04']);
    const [selectedGroup, setSelectedGroup] = useState(['IBERIA']);
    const [minDate, setMinDate] = useState();
    const [maxDate, setMaxDate] = useState();

    const handleDateChange = (e) => {
        setSelectedDate(Array.isArray(e) ? e.map(x => x.value) : []);
    }

    const handleCustChange = (e) => {
        setSelectedGroup(Array.isArray(e) ? e.map(x => x.value) : []);
    }

    const dateoptions = [
        {value: '2021-01-01', label:'2021-01'},
        {value: '2021-02-01', label:'2021-02'},
        {value:'2021-03-01', label:'2021-03'},
        {value: '2021-04-01', label:'2021-04'}]

    const cust_comp_opt = [
        {value: 'IBERIA', label: 'Iberia'},
        {value: 'IBERIA EXPRESS', label: 'Iberia Express'},
        {value: 'IAG CARGO', label: 'IAG Cargo'},
        {value: 'OTHERS', label: 'Others'}
    ]


    const handleSubmit = (event) => {
        console.log(selectedDate)
        if ((!minDate && !maxDate) || selectedDate.length === 0) {
            setMinDate('2021-01-01')
            setMaxDate('2021-04-01')
        } else {
            setMinDate(selectedDate.reduce((acc,date)=>{return acc&&new Date(acc)<new Date(date)?acc:date},''))
            setMaxDate(selectedDate.reduce((acc,date)=>{return acc&&new Date(acc)>new Date(date)?acc:date},''))
        }
        props.getDataFromAPI({minDate, maxDate, selectedGroup})
    }

    return (
        <div class="grid min-w-full grid-cols-10 align-left items-center pl-3 my-3 gap-4">
            <div class="col-span-3 min-w-full rounded text-center">
                <Select options={cust_comp_opt}
                    isMulti
                    onChange={handleCustChange}
                    placeholder="Select cst. company group"
                    defaultValue={{value: 'IBERIA', label: 'Iberia'}}
                    class="rounded"
                />
            </div>
            <div class="col-span-3 min-w-full rounded text-center">
                <Select options={dateoptions}
                    isMulti
                    onChange={handleDateChange}
                    placeholder="Select month(s)"
                    defaultValue={[{value:'2021-01-01', label:'2021-01'}, {value:'2021-04-01', label:'2021-04'}]}
                    class="rounded"
                />
            </div>
            <div class="col-span-2"> 
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1.5 px-4 rounded" onClick={handleSubmit}>
                    Apply Filters
                </button>
            </div>
        </div>
    )
}

export default FilterBar;