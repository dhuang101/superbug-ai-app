import { useContext } from "react"
import SummaryTable from "../../../components/InfectionPre/SubComponents/SummaryTable"
import RouterContext from "../../../contexts/RouterContext"
import Breadcrumbs from "../../../components/Breadcrumbs"

function InfPreSummary() {
	// global state container
	const routerContext = useContext(RouterContext)
	console.log(routerContext.value)
	return (
		<div className="flex flex-col w-8/12">
			<Breadcrumbs />
			<SummaryTable />
		</div>
	)
}

export default InfPreSummary
