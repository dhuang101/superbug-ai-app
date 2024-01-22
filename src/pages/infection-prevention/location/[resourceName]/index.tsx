import { useRouter } from "next/router"
import Breadcrumbs from "../../../../components/Breadcrumbs"
import GanttChart from "../../../../components/InfectionPre/SubComponents/GanttChart"
import { useContext } from "react"
import { GlobalContext } from "../../../../contexts/GlobalStore"

function InfLocaSummary() {
	// router
	const router = useRouter()
	// global state access
	const [globalState, dispatch] = useContext(GlobalContext)

	return (
		<div className="flex flex-col w-8/12 min-h-[78vh]">
			<Breadcrumbs />
			<article className="text-3xl mb-4 font-semibold">
				{router.query.resourceName}
			</article>
			<div className="h-full w-full">
				<GanttChart
					data={globalState.countData.summaryData}
					startDate={globalState.countData.startDate}
					endDate={globalState.countData.endDate}
				/>
			</div>
		</div>
	)
}

export default InfLocaSummary
