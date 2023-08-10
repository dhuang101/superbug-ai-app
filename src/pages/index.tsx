import Link from "next/link"
import { useContext } from "react"
import ApiContext from "../contexts/ApiContext"
import PersonSearchIcon from "@mui/icons-material/PersonSearch"
import BiotechIcon from "@mui/icons-material/Biotech"
import ApiIcon from "@mui/icons-material/Api"

// functionally just a wrapper that allows the / path to lead to the patient list
function Home() {
	// global state container
	const apiContext = useContext(ApiContext)

	return (
		<div className="flex flex-col h-full justify-center w-3/5">
			<article className="text-7xl font-semibold text-center">
				Superbug AI
			</article>
			<article className="text-base mt-6 text-center">
				Current API: {apiContext.value}
			</article>
			<div className="flex mt-20 justify-around text-lg text-center">
				<Link
					href="/PatientSearch"
					className="flex flex-col items-center w-[96px] rounded hover:bg-base-300"
				>
					<PersonSearchIcon sx={{ fontSize: 56 }} />
					<article>
						Patient
						<br />
						Search
					</article>
				</Link>
				<Link
					href="/InfectionPrevention"
					className="flex flex-col items-center w-[96px] rounded hover:bg-base-300"
				>
					<BiotechIcon sx={{ fontSize: 56 }} />
					<article>
						Infection
						<br />
						Prevention
					</article>
				</Link>
				<Link
					href="/FhirApi"
					className="flex flex-col items-center w-[96px] rounded hover:bg-base-300"
				>
					<ApiIcon sx={{ fontSize: 56 }} />
					<article>
						Change
						<br />
						API
					</article>
				</Link>
			</div>
		</div>
	)
}

export default Home
