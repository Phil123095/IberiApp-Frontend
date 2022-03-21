/*import Row from 'react-bootstrap/Row';*/
import '../../css-styling/dashboard.css';


function SummaryWidgets(props) {
    const summary_data = props.summary_data; 

    /*const incident_trial = {"Total Incidents Raised": 500, "Total P1 Incidents": 300, "Total P2 Incidents": 200}*/
    /*const incident_summ = [
        {title: "Total Incidents Raised", amount: 500},
        {title: "Total P1 Incidents", amount: 200}
    ]*/

    return (
        <div class="w-full grid grid-cols-5 gap-1">
            {summary_data.map((item, index) => {
                console.log(item, index)
                return(
                    <div className="sm-white shadow-sm rounded-sm border border-slate-200 m-2 p-3 justify-items-center align-items-center">
                        <h3 className="text-sm font-bold text-black-800 mb-2">{item.value}</h3>
                        <h3 className="text-sm font-semibold text-slate-800 mb-2">{item.key}</h3>
                    </div>
                );
              })
            }
        </div>
    )
}

export default SummaryWidgets;