import React from "react"

function AllergiesDetails(props: any) {
	console.log(props)
	// component that generates each row
	function TableRows() {
		return (
			<React.Fragment>
				<tr></tr>
			</React.Fragment>
		)
	}

	return (
		<React.Fragment>
			{props.allergyData.length === 0 ? (
				<div className="pl-16">
					<article>No Medication History</article>
				</div>
			) : (
				<div className="flex justify-center">
					<table className="table w-11/12">
						<thead>
							<tr>
								<th>ID</th>
								<th>Name</th>
								<th>Gender</th>
								<th>DoB</th>
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

export default AllergiesDetails
