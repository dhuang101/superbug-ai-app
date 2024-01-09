import { useRouter } from "next/router"
import Breadcrumbs from "../../../../components/Breadcrumbs"
import ReactFlow from "reactflow"
import "reactflow/dist/style.css"

function InfPreSummary() {
	// router
	const router = useRouter()
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
			<div className="w-full h-[82vh]">
				<ReactFlow nodes={initialNodes} edges={initialEdges} />
			</div>
		</div>
	)
}

export default InfPreSummary
