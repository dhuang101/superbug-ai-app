import { useRouter } from "next/router"
import React from "react"

interface Props {
	name: string
	searchData: any
	startDate?: any
	endDate?: any
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
							key={obj.name}
							id={obj.name}
							className="hover:text-accent-content hover:bg-accent cursor-pointer"
							onClick={async (
								event: React.MouseEvent<HTMLTableRowElement>
							) => {
								// typing the event.target
								let clickedElement =
									event.target as HTMLButtonElement
								let parentElement =
									clickedElement.parentNode as HTMLTableRowElement
								// push next page
								router.push({
									pathname:
										`/infection-prevention/${props.name}/` +
										encodeURIComponent(parentElement.id),
									query: {
										code: encodeURIComponent(obj.code),
										startDate: encodeURIComponent(
											props.startDate
										),
										endDate: encodeURIComponent(
											props.endDate
										),
									},
								})
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
					<table className="table table-lg w-full overflow-x-auto">
						<thead>
							<tr>
								<th className="bg-base-300">
									{props.name.charAt(0).toUpperCase() +
										props.name.slice(1) +
										" Name"}
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
