import { useRouter } from "next/router"
import { useContext, useState, useEffect } from "react"
import { GlobalContext } from "../../../../contexts/GlobalStore"
import Breadcrumbs from "../../../../components/Breadcrumbs"
import NetworkGraph from "../../../../components/InfectionPre/SubComponents/NetworkGraph"
import { CircularProgress } from "@mui/material"
import axios from "axios"

function InfProcSummary() {
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
			// grab data
			await axios
				.get("/api/procedure/searchByCode", {
					params: {
						apiUrl: globalState.apiUrl,
						code: router.query.code,
						start: router.query.startDate,
						end: router.query.startDate,
					},
				})
				.then((result) => {
					// clean and return the data
					setData(
						result.data.entry.map((obj) => {
							return {
								patientId:
									obj.resource.subject.reference.split(
										"/"
									)[1],
								procedureName: obj.resource.code.text,
								performedDate: new Date(
									obj.resource.occurrenceDateTime
								)
									.toISOString()
									.split("T")[0],
							}
						})
					)
				})
		}
	}

	return (
		<div className="flex flex-col w-8/12">
			<Breadcrumbs />
			<article className="text-3xl mb-4 font-semibold">
				{router.query.resourceName}
			</article>
			{data !== undefined ? (
				<NetworkGraph
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
	)
}

export default InfProcSummary
