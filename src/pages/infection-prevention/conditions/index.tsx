import { useRouter } from "next/router"
import { useEffect } from "react"

// component redirects page to main infection prevention page
function InfRedirect() {
	// router
	const router = useRouter()

	useEffect(() => {
		router.replace("/infection-prevention")
	}, [])
}

export default InfRedirect
