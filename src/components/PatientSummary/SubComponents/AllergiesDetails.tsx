import React from "react"

function AllergiesDetails(props: any) {
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
				<div className="">
					<article>No Allergies History</article>
				</div>
			) : (
				<div className="flex justify-center">
					<table className="table w-full">
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
