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
						<tr
							key={i}
							className="hover:text-accent-content hover:bg-accent cursor-pointer"
						>
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
					<table className="table w-full overflow-x-auto">
						<thead>
							<tr>
								<th className="bg-base-300">ID</th>
								<th className="bg-base-300">Name</th>
								<th className="bg-base-300">Status</th>
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
