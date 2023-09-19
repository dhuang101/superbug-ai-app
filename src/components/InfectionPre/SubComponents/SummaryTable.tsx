import React from "react"

interface Props {
	searchData: any
	colNames: any
}

function SummaryTable(props) {
	function TableRows() {
		return (
			<React.Fragment>
				{props.searchData.map((obj, i) => {
					return (
						<tr
							key={i}
							className="hover:text-accent-content hover:bg-accent hover"
						>
							{Object.entries(obj).map(
								([key, value]: [string, string], i) => {
									return <td key={i}>{value}</td>
								}
							)}
						</tr>
					)
				})}
			</React.Fragment>
		)
	}

	return (
		<React.Fragment>
			{props.searchData.length === 0 ? (
				<div className="flex justify-center items-center h-[51vh]">
					<article className="text-3xl">No Results Found</article>
				</div>
			) : (
				<div className="flex justify-center">
					<table className="table table-md w-full overflow-x-auto [&_tr.hover:hover_*]:!bg-accent">
						<thead>
							<tr>
								{props.colNames.map((title, i) => {
									return (
										<th key={i} className="bg-base-300">
											{title}
										</th>
									)
								})}
							</tr>
						</thead>
						<tbody>
							<TableRows />
						</tbody>
					</table>
				</div>
			)}
		</React.Fragment>
	)
}

export default SummaryTable
