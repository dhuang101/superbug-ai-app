function MedicationHistory() {
	// component that generates each row
	function TableRows() {
		return <div></div>
	}
	return (
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
	)
}

export default MedicationHistory
