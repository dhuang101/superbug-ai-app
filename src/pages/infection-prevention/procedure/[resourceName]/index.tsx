import { useRouter } from "next/router"
import Breadcrumbs from "../../../../components/Breadcrumbs"
import ReactFlow, { Background, Controls, MiniMap } from "reactflow"
import "reactflow/dist/style.css"
import { useEffect, useState } from "react"

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

		rawData.forEach((procedure) => {
			console.log(procedure)

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

			// generates edges for the given procedure
		})
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
			<div className="w-full h-[82vh] bg-[oklch(var(--s))]">
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
