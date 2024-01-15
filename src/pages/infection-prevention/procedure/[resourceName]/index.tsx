import { useRouter } from "next/router"
import { useCallback, useEffect, useState } from "react"
import Dagre from "@dagrejs/dagre"
import ReactFlow, {
	Background,
	Controls,
	MiniMap,
	ReactFlowProvider,
	Panel,
	useNodesState,
	useEdgesState,
	useReactFlow,
} from "reactflow"
import Breadcrumbs from "../../../../components/Breadcrumbs"
import "reactflow/dist/style.css"

// const initialNodes = [
// 	{ id: "1", position: { x: 0, y: 0 }, data: { label: "1" } },
// 	{ id: "2", position: { x: 0, y: 100 }, data: { label: "2" } },
// ]
// const initialEdges = [{ id: "e1-2", source: "1", target: "2" }]

const g = new Dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}))

const getLayoutedElements = (nodes, edges, options) => {
	g.setGraph({ rankdir: options.direction })

	edges.forEach((edge) => g.setEdge(edge.source, edge.target))
	nodes.forEach((node) => g.setNode(node.id, node))

	Dagre.layout(g, { align: "UL" })

	return {
		nodes: nodes.map((node) => {
			const { x, y } = g.node(node.id)

			return { ...node, position: { x, y } }
		}),
		edges,
	}
}

function InfProcSummary() {
	// router
	const router = useRouter()
	const { fitView } = useReactFlow()
	const [nodes, setNodes, onNodesChange] = useNodesState([])
	const [edges, setEdges, onEdgesChange] = useEdgesState([])

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

	const onLayout = useCallback(
		(direction) => {
			const layouted = getLayoutedElements(nodes, edges, { direction })

			setNodes([...layouted.nodes])
			setEdges([...layouted.edges])

			window.requestAnimationFrame(() => {
				fitView()
			})
		},
		[nodes, edges]
	)

	return (
		<div className="flex flex-col w-8/12">
			<Breadcrumbs />
			<article className="text-3xl mb-4 font-semibold">
				{router.query.resourceName}
			</article>
			<div className="w-full h-[80vh] bg-[oklch(var(--s))]">
				<ReactFlow
					nodes={nodes}
					edges={edges}
					onNodesChange={onNodesChange}
					onEdgesChange={onEdgesChange}
					fitView
				>
					<Panel position="top-right">
						<button
							className="button"
							onClick={() => onLayout("TB")}
						>
							vertical layout
						</button>
					</Panel>
					<Background color="oklch(var(--sc))" />
					<MiniMap />
					<Controls />
				</ReactFlow>
			</div>
		</div>
	)
}

export default function () {
	return (
		<ReactFlowProvider>
			<InfProcSummary />
		</ReactFlowProvider>
	)
}
