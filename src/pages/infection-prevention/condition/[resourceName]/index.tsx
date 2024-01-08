import { useRouter } from "next/router"
import SummaryTable from "../../../../components/InfectionPre/SubComponents/SummaryTable"
import Breadcrumbs from "../../../../components/Breadcrumbs"

function InfPreSummary() {
	// router
	const router = useRouter()

	return (
		<div className="flex flex-col w-8/12">
			<Breadcrumbs />
			<article className="text-3xl mb-4 font-semibold">
				{router.query.resourceName}
			</article>
			<SummaryTable
				searchData={JSON.parse(
					decodeURIComponent(router.query.summaryData as string)
				)}
				colNames={router.query.colNames}
			/>
		</div>
	)
}

export default InfPreSummary
