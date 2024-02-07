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
	const [data, setData] = useState({})

	useEffect(() => {
		fetchData()
	}, [router.query])

	async function fetchData() {
		// temp variables
		let nodes = []
		let edges = []
		let edgeMap = {}

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
				.then(async (result) => {
					// clean and return the data
					result.data.entry.map((obj, i) => {
						// checks if the current procedure's patient does not have a node
						if (
							!nodes.some(
								(node) =>
									node.id ===
									obj.resource.subject.reference.split("/")[1]
							)
						) {
							// creates a node for that patient
							nodes.push({
								id: obj.resource.subject.reference.split(
									"/"
								)[1],
								position: { x: 0, y: 200 * i },
								data: {
									label: obj.resource.subject.reference.split(
										"/"
									)[1],
								},
							})
						}
					})
					// we then fetch all the organisms related to the patients/nodes
					for (const node of nodes) {
						await axios
							.get("/api/diagnosticReport/searchByPatient", {
								params: {
									apiUrl: globalState.apiUrl,
									patientId: node.id,
									start: router.query.startDate,
									end: router.query.endDate,
								},
							})
							.then((res) => {
								// use the fetched data to create an edgemap
								if (res.data.hasOwnProperty("entry")) {
									res.data.entry.forEach((organism) => {
										if (
											organism.resource.conclusionCode[0]
												.coding[0].code in edgeMap
										) {
											if (
												!edgeMap[
													organism.resource
														.conclusionCode[0]
														.coding[0].code
												].includes(node.id)
											) {
												edgeMap[
													organism.resource
														.conclusionCode[0]
														.coding[0].code
												].push(node.id)
											}
										} else {
											// otherwise we create both the key and the value for the procedure
											edgeMap[
												organism.resource.conclusionCode[0].coding[0].code
											] = [node.id]
										}
									})
								}
							})
					}
				})
				.then(() => {
					// use the edge map to create the edges
					for (const [organism, patients] of Object.entries(
						edgeMap
					)) {
						// assign a type to the patients
						let patientsList = patients as [string]
						// parse through the patients generating the edges
						patientsList.forEach((patient, i) => {
							let targetNodes = patientsList.slice(i + 1)
							targetNodes.forEach((node) => {
								edges.push({
									id: edges.length,
									source: patient,
									target: node,
									data: { label: organism },
								})
							})
						})
					}
					setData({ nodes: nodes, edges: edges })
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
