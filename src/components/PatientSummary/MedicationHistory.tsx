import React, { useEffect } from "react"

function MedicationHistory(props) {
	useEffect(() => {
		console.log(props.medicationData)
	}, [])

	// component that generates each row
	function TableRows() {
		return props.medicationData.map((obj: any, i: number) => {
			return (
				<tr key={i} className="hover cursor-pointer">
					<td>{obj.id}</td>
					<td>{obj.name}</td>
					<td>{obj.category}</td>
					<td>{obj.status}</td>
				</tr>
			)
		})
	}

	return (
		<React.Fragment>
			{props.medicationData.length === 0 ? (
				<div className="pl-16">
					<article>No Medication History</article>
				</div>
			) : (
				<div className="flex justify-center">
					<table className="table w-11/12 [&_tr.hover:hover_*]:!bg-slate-300">
						<thead>
							<tr>
								<th>ID</th>
								<th>Name</th>
								<th>Category</th>
								<th>Status</th>
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

export default MedicationHistory
