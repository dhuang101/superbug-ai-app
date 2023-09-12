import { useRouter } from "next/router"
import React, { useContext } from "react"
import RouterContext from "../../../contexts/RouterContext"

interface Props {
	searchData: any
	name: string
	OpenSummary: any
}

function CountTable(props: Props) {
	const router = useRouter()
	// global state container
	const routerContext = useContext(RouterContext)
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
								// running passed open summary function
								let searchData = await props.OpenSummary(
									parentElement.id
								)
								// post resolved data to global context
								routerContext.setter({
									searchData: searchData[0],
									colNames: searchData[1],
								})
								// push next page
								router.push(
									`/InfectionPrevention/` +
										encodeURIComponent(
											clickedElement.textContent
										)
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
