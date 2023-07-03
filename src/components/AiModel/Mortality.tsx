import { CircularProgress } from "@mui/material"
import { useRouter } from "next/router"
import React, { useEffect, useState, useContext, ChangeEvent } from "react"
import ApiContext from "../../contexts/ApiContext"
import { getEncForPatient, getObsForEnc } from "../../services/PatientSummary"
import LineGraph from "./SubComponents/LineGraph"

function Mortality() {
	// const for path param
	// for some reason useParams() returns null
	const { asPath } = useRouter()
	// global state container
	const apiContext = useContext(ApiContext)

	// state variables
	const [loading, setLoading] = useState(true)
	const [encounters, setEncounters] = useState([])
	const [selectedEnc, setSelectedEnc] = useState("")
	const [data, setData] = useState([])

	// on mount grabs encounters related to patient
	useEffect(() => {
		// splits the path to grab to id
		let id = asPath.split("/")[2]
		// grab list of encounters
		getEncForPatient(apiContext.value, id, "inpatient")
			.then((result: any) => {
				setEncounters(result)
			})
			.then(setLoading(false))
	}, [])

	// once a valid encounter is selected grabs the
	// corresponding observations
	useEffect(() => {
		if (selectedEnc !== "") {
			getObsForEnc(
				apiContext.value,
				encounters[selectedEnc].resource.id,
				"Patient Mortality Rate"
			).then((result: any) => {
				setData(marshallData(result))
			})
		}
	}, [selectedEnc])

	// organises data from the fetched observations
	function marshallData(data: any) {
		return data.map((obj: any) => {
			return {
				issued: obj.resource.issued,
				value: obj.resource.valueQuantity.value,
				unit: obj.resource.valueQuantity.unit,
			}
		})
	}

	function handleSelect(event: ChangeEvent<HTMLSelectElement>): void {
		setSelectedEnc(event.target.value)
	}

	// generates the options for the select
	function SelectOptions() {
		return (
			<React.Fragment>
				<option disabled value={""}>
					Encounter Selection
				</option>
				{encounters.map((obj: any, i: number) => {
					let display =
						new Date(obj.resource.period.start).toLocaleString(
							"en-AU",
							{
								timeZone:
									Intl.DateTimeFormat().resolvedOptions()
										.timeZone,
							}
						) +
						" - " +
						new Date(obj.resource.period.end).toLocaleString(
							"en-AU",
							{
								timeZone:
									Intl.DateTimeFormat().resolvedOptions()
										.timeZone,
							}
						)
					return (
						<option value={i} key={i}>
							{display}
						</option>
					)
				})}
			</React.Fragment>
		)
	}

	return (
		<React.Fragment>
			{loading ? (
				<div className="flex items-center justify-center h-full">
					<CircularProgress size={80} />
				</div>
			) : encounters.length === 0 ? (
				<div className="flex items-center justify-center h-[68vh] text-3xl">
					No Recorded Encounters
				</div>
			) : (
				<React.Fragment>
					<div className="flex flex-col min-h-full">
						<article className="mb-6 text-xl font-semibold text-center">
							Predicted Mortality Rate
						</article>
						<select
							className="select select-bordered max-w-sm"
							onChange={handleSelect}
							value={selectedEnc}
						>
							<SelectOptions />
						</select>
						<div className="h-1/2 mt-4">
							<LineGraph data={data} />
						</div>
					</div>
				</React.Fragment>
			)}
		</React.Fragment>
	)
}

export default Mortality
