interface Props {
	// patientData is the object returned by the API
	patientData: any
}

function MainTable({ patientData }: Props) {
	function TableRows() {
		return patientData.map((obj: any, i: number) => {
			let name: string
			if (obj.resource.hasOwnProperty("name")) {
				name =
					obj.resource.name[0].given[0] +
					" " +
					obj.resource.name[0].family
			} else {
				name = "Not Given"
			}

			return (
				<tr key={i}>
					<td>{obj.resource.id}</td>
					<td>{name}</td>
					<td>
						{obj.resource.gender[0].toUpperCase() +
							obj.resource.gender.substring(1)}
					</td>
					<td>{obj.resource.birthDate}</td>
				</tr>
			)
		})
	}

	return (
		<div className="overflow-x-auto">
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
	)
}

export default MainTable
