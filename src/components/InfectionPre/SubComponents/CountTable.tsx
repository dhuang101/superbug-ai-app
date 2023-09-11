import { useRouter } from "next/router"
import React from "react"

interface Props {
	searchData: any
	name: string
}

function CountTable(props: Props) {
	const router = useRouter()
	// component that generates each row
	function TableRows() {
		return (
			<React.Fragment>
				{props.searchData.map((obj: any, i: number) => {
					return (
						<tr
							key={i}
							className="hover:text-accent-content hover:bg-accent"
							onClick={(
								event: React.MouseEvent<HTMLTableRowElement>
							) => {
								let clickedElement =
									event.target as HTMLButtonElement
								let encodedString = encodeURIComponent(
									clickedElement.textContent
								)
								router.push(
									`/InfectionPrevention/` + encodedString
								)
							}}
						>
							<td>{obj.name}</td>
							<td>{obj.count}</td>
						</tr>
					)
				})}
			</React.Fragment>
		)
	}

	return (
		<React.Fragment>
			{props.searchData.length === 0 ? (
				<div className="flex justify-center items-center h-[51vh]">
					<article className="text-3xl">No Results Found</article>
				</div>
			) : (
				<div className="flex justify-center">
					<table className="table table-md w-full overflow-x-auto">
						<thead>
							<tr>
								<th className="bg-base-300">
									{props.name + " Name"}
								</th>
								<th className="bg-base-300">Count</th>
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

export default CountTable
