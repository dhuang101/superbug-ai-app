import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import ReactFlow, { Background, Controls, MiniMap } from "reactflow"
import Breadcrumbs from "../../../../components/Breadcrumbs"
import "reactflow/dist/style.css"

function InfPreSummary() {
	// router
	const router = useRouter()
	const [nodes, setNodes] = useState([])
	const [edges, setEdges] = useState([])

	// generate edges and node from data
	useEffect(() => {
		// parse data from query
		let rawData = JSON.parse(
			decodeURIComponent(router.query.summaryData as string)
		)
		// temp variables
		let nodes = []
		let edges = []
		let edgeMap = {}

		// generate the nodes and an edge map
		rawData.forEach((procedure) => {
			// checks if the current procedure's patient does not have a node
			if (
				!nodes.some((node) => {
					node.id === procedure.patientId
				})
			) {
				// creates a node for that patient
				nodes.push({
					id: procedure.patientId,
					position: { x: 0, y: 0 },
					data: { label: procedure.patientId },
				})
			}

			// adds the procedure and the corresponding patient to the edge map
			// first check if the procedure exists in the map
			if (procedure.procedureName in edgeMap) {
				// if it does we then check if the patient already exists in the procedure's value
				if (
					!edgeMap[procedure.procedureName].includes(
						procedure.patientId
					)
				) {
					edgeMap[procedure.procedureName].push(procedure.patientId)
				}
			} else {
				// otherwise we create both the key and the value for the procedure
				edgeMap[procedure.procedureName] = [procedure.patientId]
			}
		})

		// use the edge map to create the edges
		for (const [procedure, patients] of Object.entries(edgeMap)) {
			// assign a type to the patients
			let patientsList = patients as [string]
			// parse through the patients generating the edges
			patientsList.forEach((patient, i) => {
				let targetNodes = patientsList.slice(i + 1)
				targetNodes.forEach((node) => {
					edges.push({
						id: i,
						source: patient,
						target: node,
						data: { label: procedure },
					})
				})
			})
		}

		// set data to state
		setNodes(nodes)
		setEdges(edges)
	}, [])

	const initialNodes = [
		{ id: "1", position: { x: 0, y: 0 }, data: { label: "1" } },
		{ id: "2", position: { x: 0, y: 100 }, data: { label: "2" } },
	]
	const initialEdges = [{ id: "e1-2", source: "1", target: "2" }]

	return (
		<div className="flex flex-col w-8/12">
			<Breadcrumbs />
			<article className="text-3xl mb-4 font-semibold">
				{router.query.resourceName}
			</article>
			<div className="w-full h-[80vh] bg-[oklch(var(--s))]">
				<ReactFlow nodes={nodes} edges={edges}>
					<Background color="oklch(var(--sc))" />
					<MiniMap />
					<Controls />
				</ReactFlow>
			</div>
		</div>
	)
}

export default InfPreSummary
