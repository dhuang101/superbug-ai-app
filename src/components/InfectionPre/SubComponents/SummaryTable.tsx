import Link from "next/link"
import React from "react"

interface Props {
	searchData: any
	colNames: any
}

function SummaryTable(props: Props) {
	function TableRows() {
		return (
			<React.Fragment>
				{props.searchData.map((obj, i) => {
					return (
						<tr
							key={i}
							className="bg-base-100 hover:text-accent-content hover:bg-accent"
						>
							{Object.entries(obj).map(
								([key, value]: [string, string], i) => {
									if (key === "patientId") {
										return (
											<td key={i}>
												<Link
													className="pointer-events-auto"
													href={
														`/patient-search/` +
														value
													}
												>
													{value}
												</Link>
											</td>
										)
									} else {
										return <td key={i}>{value}</td>
									}
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
					<table className="table table-lg mb-4 w-full overflow-x-auto">
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
