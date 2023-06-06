import React, { useEffect } from "react"

function MedicationHistory(props) {
	useEffect(() => {}, [])
	// component that generates each row
	function TableRows() {
		return <tr></tr>
	}

	return (
		<React.Fragment>
			{props.medicationData.length === 0 ? (
				<div className="pl-16">
					<article>No Medication Data</article>
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
