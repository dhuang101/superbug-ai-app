import { useRouter } from "next/router"
import SummaryTable from "../../../../components/InfectionPre/SubComponents/SummaryTable"
import Breadcrumbs from "../../../../components/Breadcrumbs"
import { useContext } from "react"
import { GlobalContext } from "../../../../contexts/GlobalStore"

function InfPreSummary() {
	// router
	const router = useRouter()
	// global state access
	const [globalState, dispatch] = useContext(GlobalContext)

	return (
		<div className="flex flex-col w-8/12">
			<Breadcrumbs />
			<article className="text-3xl mb-4 font-semibold">
				{router.query.resourceName}
			</article>
			<SummaryTable
				searchData={globalState.countData.summaryData[0]}
				colNames={globalState.countData.summaryData[1]}
			/>
		</div>
	)
}

export default InfPreSummary
