import React from "react"
import { medAdValidated } from "../../../types/ValidationTypes"

interface Props {
	medicationData: medAdValidated[]
}

function MedicationHistory(props: Props) {
	// component that generates each row
	function TableRows() {
		return (
			<React.Fragment>
				{props.medicationData.map((obj: any, i: number) => {
					return (
						<tr key={i} className="hover">
							<td>{obj.id}</td>
							<td>{obj.name}</td>
							<td>{obj.status}</td>
						</tr>
					)
				})}
			</React.Fragment>
		)
	}

	return (
		<React.Fragment>
			{props.medicationData.length === 0 ? (
				<div>
					<article>No Medication History</article>
				</div>
			) : (
				<div className="flex justify-center">
					<table className="table w-full [&_tr.hover:hover_*]:!bg-slate-300">
						<thead>
							<tr>
								<th>ID</th>
								<th>Name</th>
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
