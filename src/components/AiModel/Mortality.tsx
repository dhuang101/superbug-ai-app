import { CircularProgress } from "@mui/material"
import { useRouter } from "next/router"
import React, { useEffect, useState, useContext, ChangeEvent } from "react"
import ApiContext from "../../contexts/ApiContext"
import { getEncForPatient } from "../../services/PatientSummary"

function Mortality() {
	// const for path param
	// for some reason useParams() returns null
	const { asPath } = useRouter()
	// global state container
	const apiContext = useContext(ApiContext)

	// state variables
	const [loading, setLoading] = useState(true)
	const [encounters, setEncounters] = useState([])
	const [selectedEnc, setSelectedEnc] = useState()

	useEffect(() => {
		// splits the path to grab to id
		let id = asPath.split("/")[2]
		// grab list of encounters
		getEncForPatient(apiContext.value, id, "inpatient")
			.then((result: any) => {
				setEncounters(result)
				console.log(result)
			})
			.then(setLoading(false))
	}, [])

	function handleSelect(event: ChangeEvent<HTMLSelectElement>): void {
		throw new Error("Function not implemented.")
	}

	function selectOptions() {
		encounters.map(() => {})
	}

	return (
		<React.Fragment>
			{!loading ? (
				<React.Fragment>
					<div className="flex flex-col">
						<article className="mb-6 text-xl font-semibold text-center">
							Predicted Mortality Rate
						</article>
						<select
							className="select select-bordered max-w-xs"
							onChange={handleSelect}
							value={selectedEnc}
						>
							<option value={"id"}>Search By ID</option>
							<option value={"name"}>Search By Name</option>
						</select>
					</div>
				</React.Fragment>
			) : (
				<div className="flex items-center justify-center h-full">
					<CircularProgress size={80} />
				</div>
			)}
		</React.Fragment>
	)
}

export default Mortality
