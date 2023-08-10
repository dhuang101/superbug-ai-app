import React from "react"

interface Props {
	searchData: any
	name: string
}

function InfPreTable(props: Props) {
	// component that generates each row
	function TableRows() {
		return (
			<React.Fragment>
				{props.searchData.map((obj: any, i: number) => {
					return (
						<tr key={i} className="hover">
							<td>{obj.name}</td>
							<td>{obj.valueQuantity.value}</td>
						</tr>
					)
				})}
			</React.Fragment>
		)
	}

	return (
		<React.Fragment>
			{props.searchData.length === 0 ? (
				<div>
					<article>No Results Found</article>
				</div>
			) : (
				<div className="flex justify-center">
					<table className="table w-full [&_tr.hover:hover_*]:!bg-accent overflow-x-auto">
						<thead>
							<tr>
								<th className="bg-base-300">
									{props.name + " Name"}
								</th>
								<th className="bg-base-300">Count</th>
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

export default InfPreTable
