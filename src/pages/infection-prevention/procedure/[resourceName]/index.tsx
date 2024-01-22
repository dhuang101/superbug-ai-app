// d3 contains untyped variables so we must disable ts
// @ts-nocheck

import { useRouter } from "next/router"
import React, { useEffect, useMemo } from "react"
import { useContext } from "react"
import { GlobalContext } from "../../../../contexts/GlobalStore"
import {
	forceSimulation,
	forceLink,
	forceManyBody,
	forceX,
	forceY,
} from "d3-force"
import ReactFlow, {
	Background,
	Controls,
	MiniMap,
	ReactFlowProvider,
	Panel,
	useNodesState,
	useEdgesState,
	useReactFlow,
	useStore,
} from "reactflow"
import collide from "../../../../functions/Collide.js"
import Breadcrumbs from "../../../../components/Breadcrumbs"
import "reactflow/dist/style.css"

const simulation = forceSimulation()
	.force("charge", forceManyBody().strength(-1000))
	.force("x", forceX().x(0).strength(0.2))
	.force("y", forceY().y(0).strength(0.2))
	.force("collide", collide())
	.alphaTarget(0.05)
	.stop()

const useLayoutedElements = () => {
	const { getNodes, setNodes, getEdges, fitView } = useReactFlow()
	const initialised = useStore((store) =>
		[...store.nodeInternals.values()].every(
			(node) => node.width && node.height
		)
	)

	return useMemo(() => {
		let nodes = getNodes().map((node) => ({
			...node,
			x: node.position.x,
			y: node.position.y,
		}))
		let edges = getEdges().map((edge) => edge)
		let running = false

		// If React Flow hasn't initialised our nodes with a width and height yet, or
		// if there are no nodes in the flow, then we can't run the simulation!
		if (!initialised || nodes.length === 0) return [false, {}]

		simulation.nodes(nodes).force(
			"link",
			forceLink(edges)
				.id((d) => d.id)
				.strength(0.05)
				.distance(750)
		)

		// The tick function is called every animation frame while the simulation is
		// running and progresses the simulation one step forward each time.
		const tick = () => {
			getNodes().forEach((node, i) => {
				const dragging = Boolean(
					document.querySelector(`[data-id="${node.id}"].dragging`)
				)

				// Setting the fx/fy properties of a node tells the simulation to "fix"
				// the node at that position and ignore any forces that would normally
				// cause it to move.
				nodes[i].fx = dragging ? node.position.x : null
				nodes[i].fy = dragging ? node.position.y : null
			})

			simulation.tick()
			setNodes(
				nodes.map((node) => ({
					...node,
					position: { x: node.x, y: node.y },
				}))
			)

			window.requestAnimationFrame(() => {
				// Give React and React Flow a chance to update and render the new node
				// positions before we fit the viewport to the new layout.
				fitView()

				// If the simulation hasn't be stopped, schedule another tick.
				if (running) {
					tick()
				}
			})
		}

		const toggle = () => {
			running = !running
			running && window.requestAnimationFrame(tick)
		}

		const isRunning = () => running

		return [true, { toggle, isRunning }]
	}, [initialised])
}

function InfProcSummary() {
	// router
	const router = useRouter()
	// global state access
	const [globalState, dispatch] = useContext(GlobalContext)
	const [initialised, { toggle, isRunning }] = useLayoutedElements()
	const [nodes, setNodes, onNodesChange] = useNodesState([
		{
			id: "6f7acde5-db81-4361-82cf-886893a3280c",
			position: {
				x: 0,
				y: 0,
			},
			data: {
				label: "6f7acde5-db81-4361-82cf-886893a3280c",
			},
		},
		{
			id: "6f7acde5-db81-4361-82cf-886893a3280c",
			position: {
				x: 0,
				y: 200,
			},
			data: {
				label: "6f7acde5-db81-4361-82cf-886893a3280c",
			},
		},
		{
			id: "167d8dd6-7ecd-4ad5-8e7a-63a6d6f077da",
			position: {
				x: 0,
				y: 400,
			},
			data: {
				label: "167d8dd6-7ecd-4ad5-8e7a-63a6d6f077da",
			},
		},
		{
			id: "03a27898-d209-48aa-a2ec-a03f6fdaf1fe",
			position: {
				x: 0,
				y: 600,
			},
			data: {
				label: "03a27898-d209-48aa-a2ec-a03f6fdaf1fe",
			},
		},
		{
			id: "5294faca-cba1-4606-a079-23539a3e26e2",
			position: {
				x: 0,
				y: 800,
			},
			data: {
				label: "5294faca-cba1-4606-a079-23539a3e26e2",
			},
		},
		{
			id: "4789cb34-21e9-497e-aa1a-45d7fb0ef56c",
			position: {
				x: 0,
				y: 1000,
			},
			data: {
				label: "4789cb34-21e9-497e-aa1a-45d7fb0ef56c",
			},
		},
	])
	const [edges, setEdges, onEdgesChange] = useEdgesState([
		{
			id: 0,
			source: "6f7acde5-db81-4361-82cf-886893a3280c",
			target: "167d8dd6-7ecd-4ad5-8e7a-63a6d6f077da",
			data: {
				label: "Intravenous antibiotic therapy",
			},
		},
		{
			id: 1,
			source: "6f7acde5-db81-4361-82cf-886893a3280c",
			target: "03a27898-d209-48aa-a2ec-a03f6fdaf1fe",
			data: {
				label: "Intravenous antibiotic therapy",
			},
		},
		{
			id: 2,
			source: "6f7acde5-db81-4361-82cf-886893a3280c",
			target: "5294faca-cba1-4606-a079-23539a3e26e2",
			data: {
				label: "Intravenous antibiotic therapy",
			},
		},
		{
			id: 3,
			source: "6f7acde5-db81-4361-82cf-886893a3280c",
			target: "4789cb34-21e9-497e-aa1a-45d7fb0ef56c",
			data: {
				label: "Intravenous antibiotic therapy",
			},
		},
		{
			id: 4,
			source: "167d8dd6-7ecd-4ad5-8e7a-63a6d6f077da",
			target: "03a27898-d209-48aa-a2ec-a03f6fdaf1fe",
			data: {
				label: "Intravenous antibiotic therapy",
			},
		},
		{
			id: 5,
			source: "167d8dd6-7ecd-4ad5-8e7a-63a6d6f077da",
			target: "5294faca-cba1-4606-a079-23539a3e26e2",
			data: {
				label: "Intravenous antibiotic therapy",
			},
		},
		{
			id: 6,
			source: "167d8dd6-7ecd-4ad5-8e7a-63a6d6f077da",
			target: "4789cb34-21e9-497e-aa1a-45d7fb0ef56c",
			data: {
				label: "Intravenous antibiotic therapy",
			},
		},
		{
			id: 7,
			source: "03a27898-d209-48aa-a2ec-a03f6fdaf1fe",
			target: "5294faca-cba1-4606-a079-23539a3e26e2",
			data: {
				label: "Intravenous antibiotic therapy",
			},
		},
		{
			id: 8,
			source: "03a27898-d209-48aa-a2ec-a03f6fdaf1fe",
			target: "4789cb34-21e9-497e-aa1a-45d7fb0ef56c",
			data: {
				label: "Intravenous antibiotic therapy",
			},
		},
		{
			id: 9,
			source: "5294faca-cba1-4606-a079-23539a3e26e2",
			target: "4789cb34-21e9-497e-aa1a-45d7fb0ef56c",
			data: {
				label: "Intravenous antibiotic therapy",
			},
		},
	])

	// generate edges and node from data
	// useEffect(() => {
	// 	// parse data from query
	// 	let rawData = globalState.countData.summaryData
	//
	// 	// temp variables
	// 	let nodes = []
	// 	let edges = []
	// 	let edgeMap = {}

	// 	// generate the nodes and an edge map
	// 	rawData.forEach((procedure, i) => {
	// 		// checks if the current procedure's patient does not have a node
	// 		if (
	// 			!nodes.some((node) => {
	// 				node.id === procedure.patientId
	// 			})
	// 		) {
	// 			// creates a node for that patient
	// 			nodes.push({
	// 				id: procedure.patientId,
	// 				position: { x: 0, y: 200 * i },
	// 				data: { label: procedure.patientId },
	// 			})
	// 		}

	// 		// adds the procedure and the corresponding patient to the edge map
	// 		// first check if the procedure exists in the map
	// 		if (procedure.procedureName in edgeMap) {
	// 			// if it does we then check if the patient already exists in the procedure's value
	// 			if (
	// 				!edgeMap[procedure.procedureName].includes(
	// 					procedure.patientId
	// 				)
	// 			) {
	// 				edgeMap[procedure.procedureName].push(procedure.patientId)
	// 			}
	// 		} else {
	// 			// otherwise we create both the key and the value for the procedure
	// 			edgeMap[procedure.procedureName] = [procedure.patientId]
	// 		}
	// 	})

	// 	// use the edge map to create the edges
	// 	for (const [procedure, patients] of Object.entries(edgeMap)) {
	// 		// assign a type to the patients
	// 		let patientsList = patients as [string]
	// 		// parse through the patients generating the edges
	// 		patientsList.forEach((patient, i) => {
	// 			let targetNodes = patientsList.slice(i + 1)
	// 			targetNodes.forEach((node) => {
	// 				edges.push({
	// 					id: edges.length,
	// 					source: patient,
	// 					target: node,
	// 					data: { label: procedure },
	// 				})
	// 			})
	// 		})
	// 	}

	// 	// set data to state
	// 	setNodes(nodes)
	// 	setEdges(edges)
	// }, [])

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
					<Panel position={"top-left"}>
						{initialised && !isRunning() ? (
							<button className="btn btn-sm" onClick={toggle}>
								Activate Layout
							</button>
						) : (
							<button className="btn btn-sm" onClick={toggle}>
								Reset Layout
							</button>
						)}
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
