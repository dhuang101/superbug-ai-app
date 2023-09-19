import { useContext } from "react"
import { useRouter } from "next/router"
import SummaryTable from "../../../components/InfectionPre/SubComponents/SummaryTable"
import RouterContext from "../../../contexts/RouterContext"
import Breadcrumbs from "../../../components/Breadcrumbs"

function InfPreSummary() {
	// global state container
	const routerContext = useContext(RouterContext)
	// router
	const router = useRouter()
	return (
		<div className="flex flex-col w-8/12">
			<Breadcrumbs />
			<article className="text-3xl mb-4 font-semibold">
				{router.query.resourceName}
			</article>
			<SummaryTable
				searchData={routerContext.value.searchData}
				colNames={routerContext.value.colNames}
			/>
		</div>
	)
}

export default InfPreSummary
