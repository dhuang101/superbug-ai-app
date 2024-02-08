import { useRouter } from "next/router"
import Breadcrumbs from "../../../../components/Breadcrumbs"
import GanttChart from "../../../../components/InfectionPre/SubComponents/GanttChart"
import { useContext, useEffect, useState } from "react"
import { GlobalContext } from "../../../../contexts/GlobalStore"
import axios from "axios"
import { CircularProgress } from "@mui/material"

function InfLocaSummary() {
	// router
	const router = useRouter()
	// global state access
	const [globalState, dispatch] = useContext(GlobalContext)
	const [data, setData] = useState()

	useEffect(() => {
		fetchData()
	}, [router.query])

	async function fetchData() {
		if (Object.keys(router.query).length !== 0) {
			await axios
				.get("/api/location/groupedCount", {
					params: {
						apiUrl: globalState.apiUrl,
						start: router.query.startDate,
						end: router.query.endDate,
					},
				})
				.then((result: any) => {
					setData(
						result.data
							.find(
								(obj) => obj.name === router.query.resourceName
							)
							.encounters.map((obj) => {
								let resource = obj.resource
								return {
									encounterId: resource.id,
									locations: resource.location,
									patientId:
										resource.subject.reference.split(
											"/"
										)[1],
								}
							})
					)
				})
		}
	}

	return (
		<div className="flex flex-col w-8/12 min-h-[78vh]">
			<Breadcrumbs />
			<article className="text-3xl mb-4 font-semibold">
				{router.query.resourceName}
			</article>
			<div className="h-full w-full">
				{data !== undefined ? (
					<GanttChart
						data={data}
						startDate={router.query.startDate}
						endDate={router.query.endDate}
					/>
				) : (
					<div className="flex items-center justify-center h-[68vh]">
						<CircularProgress size={80} />
					</div>
				)}
			</div>
		</div>
	)
}

export default InfLocaSummary
