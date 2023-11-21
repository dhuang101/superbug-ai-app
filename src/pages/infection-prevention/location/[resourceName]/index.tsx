import { useRouter } from "next/router"
import Breadcrumbs from "../../../../components/Breadcrumbs"

function InfLocaSummary() {
	// router
	const router = useRouter()

	return (
		<div className="flex flex-col w-8/12">
			<Breadcrumbs />
			<article className="text-3xl mb-4 font-semibold">
				{router.query.resourceName}
			</article>
			<div className="flex justify-center"></div>
		</div>
	)
}

export default InfLocaSummary
