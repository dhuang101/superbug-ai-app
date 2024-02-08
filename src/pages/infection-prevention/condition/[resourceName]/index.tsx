import { useRouter } from "next/router"
import SummaryTable from "../../../../components/InfectionPre/SubComponents/SummaryTable"
import Breadcrumbs from "../../../../components/Breadcrumbs"
import { useContext, useState, useEffect } from "react"
import { GlobalContext } from "../../../../contexts/GlobalStore"
import axios from "axios"
import { CircularProgress } from "@mui/material"

function InfPreSummary() {
	// router
	const router = useRouter()
	// global state access
	const [globalState, dispatch] = useContext(GlobalContext)
	const [data, setData] = useState()

	useEffect(() => {
		fetchData()
	}, [])

	async function fetchData() {
		// local function to sort the dates
		function Compare(a, b) {
			if (a.issuedDate < b.issuedDate) {
				return 1
			}
			if (a.issuedDate > b.issuedDate) {
				return -1
			}
			return 0
		}

		let returnValue
		// grab the data
		const result = await axios.get("/api/condition/searchByCode", {
			params: {
				apiUrl: globalState.apiUrl,
				code: router.query.code,
				start: router.query.startDate,
				end: router.query.endDate,
			},
		})
		// clean the data
		// note that the order of ids matters for the summary table
		returnValue = result.data.entry.map((obj) => {
			return {
				patientId: obj.resource.subject.reference.split("/")[1],
				onsetDate: new Date(obj.resource.onsetDateTime)
					.toISOString()
					.split("T")[0],
			}
		})

		// return the data
		setData(returnValue.sort(Compare))
	}

	return (
		<div className="flex flex-col w-8/12">
			<Breadcrumbs />
			<article className="text-3xl mb-4 font-semibold">
				{router.query.resourceName}
			</article>
			{data !== undefined ? (
				<SummaryTable
					searchData={data}
					colNames={["Patient ID", "Onset Date"]}
				/>
			) : (
				<div className="flex items-center justify-center h-[68vh]">
					<CircularProgress size={80} />
				</div>
			)}
		</div>
	)
}

export default InfPreSummary
