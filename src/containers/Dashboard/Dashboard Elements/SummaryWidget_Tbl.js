
function SummaryWidget(props) {
    const summary_data = props.summary_data; 

    return (
        <div class="flex flex-row flex-wrap items-center">
            {summary_data.map((item, index) => {
                console.log(item, index)
                return(
                    <div class="flex align-items-center w-full justify-start" key={index}>
                        <div class="basis-4/6 text-sm font-semibold text-slate-400 uppercase my-2 text-left">{item.key}</div>
                        <div class="basis-2/6 text-3xl font-bold text-slate-800 my-2 text-right">{item.value}</div>
                    </div>
                );
              })
            }
        </div>
    )
}

export default SummaryWidget;