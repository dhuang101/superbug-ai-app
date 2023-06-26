function AllergiesDetails(props: any) {
	// component that generates each row
	function TableRows() {
		return <tr></tr>
	}

	return (
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
	)
}

export default AllergiesDetails
