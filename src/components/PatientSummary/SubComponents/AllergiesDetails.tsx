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
								<th className="bg-base-300">ID</th>
								<th className="bg-base-300">Name</th>
								<th className="bg-base-300">Gender</th>
								<th className="bg-base-300">DoB</th>
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
