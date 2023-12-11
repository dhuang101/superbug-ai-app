import { useRouter } from "next/router"
import Breadcrumbs from "../../../../components/Breadcrumbs"
import GanttChart from "../../../../components/InfectionPre/SubComponents/GanttChart"

function InfLocaSummary() {
	// router
	const router = useRouter()

	return (
		<div className="flex flex-col w-8/12 min-h-[78vh]">
			<Breadcrumbs />
			<article className="text-3xl mb-4 font-semibold">
				{router.query.resourceName}
			</article>
			<div className="h-full w-full">
				<GanttChart />
			</div>
		</div>
	)
}

export default InfLocaSummary
