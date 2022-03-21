
function TableIncidentsPrio(props) {
    const summary_data = props.total_raised_data; 

  return (
    <div>
      <header className="px-3 py-2 ">
        <h2 className="text-sm font-semibold text-slate-400 uppercase">{props.heading}</h2>
      </header>
      <div className="p-2">

        {/* Table */}
        <div className="overflow-x-auto overflow-y-scroll max-h-72">
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs font-semibold uppercase text-slate-400 bg-slate-50">
              <tr>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">{props.col_title}</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-center">Total Incidents</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-center">Critical Priority</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-center">High Priority</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-center">Medium Priority</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-center">Low Priority</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm divide-y divide-slate-100">
              {
                summary_data.map(entity => {
                  return (
                    <tr key={entity.name}>
                      <td className="p-2 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="font-medium text-slate-800">{entity.name}</div>
                        </div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-center">{entity.total_incidents}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-center">{entity.P1_raised}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-center">{entity.P2_raised}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-center">{entity.P3_raised}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-center">{entity.P4_raised}</div>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>

        </div>

      </div>
    </div>
  );
}

export default TableIncidentsPrio;