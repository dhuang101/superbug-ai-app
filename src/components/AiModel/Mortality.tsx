import axios from "axios"
import React, { useEffect, useState, useContext } from "react"
import LineGraph from "./SubComponents/LineGraph"
import DateSelect from "./SubComponents/DateSelect"
import { GlobalContext } from "../../contexts/GlobalStore"
import { useRouter } from "next/router"
import BarGraph from "./SubComponents/BarGraph"

function Mortality() {
	// global state container
	const [globalState, dispatch] = useContext(GlobalContext)
	const router = useRouter()

	// state variables
	const [data, setData] = useState({})
	const [selectedDate, setSelectedDate] = useState("")

	// grabs the riskAssessments related to the patient
	// creates a map based on the unique dates
	useEffect(() => {
		axios
			.get("/api/riskAssessment/byPatient", {
				params: {
					apiUrl: globalState.apiUrl,
					patient: router.query.id,
				},
			})
			.then((result: any) => {
				let dateMap = {}
				result.data.forEach((element) => {
					element.resource.note[0] = JSON.parse(
						element.resource.note[0].text.replace(/'/g, '"')
					)
					// ensures only mortality prediction resources are grabbed
					if (element.resource.note[0].Target === "Mortality") {
						// generates map
						if (
							dateMap.hasOwnProperty(
								element.resource.occurrenceDateTime
							)
						) {
							dateMap[element.resource.occurrenceDateTime].push(
								element.resource
							)
						} else {
							dateMap[element.resource.occurrenceDateTime] = [
								element.resource,
							]
						}
					}
				})
				setData(dateMap)
			})
	}, [])

	return (
		<React.Fragment>
			<div className="flex flex-col min-h-[78vh]">
				<article className="mb-6 text-xl font-semibold text-center">
					Predicted Mortality Rate
				</article>
				<DateSelect
					dates={Object.keys(data)}
					selectedDate={selectedDate}
					setSelectedDate={setSelectedDate}
				/>
				<div className="h-3/4 mt-4">
					{selectedDate === "" ? (
						<div className="flex items-center justify-center h-[60vh] text-3xl">
							Select a Prediction Date
						</div>
					) : (
						<BarGraph
							data={data[selectedDate]}
							tooltip={"Mortality"}
						/>
					)}
				</div>
			</div>
		</React.Fragment>
	)
}

export default Mortality
