import axios from "axios"
import React, { useEffect, useState, useContext } from "react"
import DateSelect from "./SubComponents/DateSelect"
import { GlobalContext } from "../../contexts/GlobalStore"
import { useRouter } from "next/router"
import { sub } from "date-fns"
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
					if (element.resource.note[0].target === "Mortality") {
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

	console.log(
		sub(new Date(data[selectedDate][0].occurrenceDateTime), {
			days: parseInt(
				data[selectedDate][0].note[0].windowBefore.split(" ")[0]
			),
		})
			.toLocaleString("en-AU", {
				timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
			})
			.split(",")[0]
	)

	// console.log(
	// 	new Date(
	// 		new Date().setDate(
	// 			new Date(data[selectedDate][0].occurrenceDateTime).getDate() -
	// 				parseInt(
	// 					data[selectedDate][0].note[0].windowBefore.split(" ")[0]
	// 				)
	// 		)
	// 	)
	// 		.toLocaleString("en-AU", {
	// 			timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
	// 		})
	// 		.split(",")[0]
	// )

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
						<React.Fragment>
							<BarGraph data={data[selectedDate]} units={"%"} />
							<div className="mx-8 mt-4">
								<article className="text-lg font-semibold">
									Prediction Details
								</article>
								<div className="flex justify-between">
									<article>
										Model:{" "}
										{data[selectedDate][0].note[0].model}
									</article>
									<article>
										Window Before:{" "}
										{
											data[selectedDate][0].note[0]
												.windowBefore
										}
										<br />
										{
											sub(
												new Date(
													data[
														selectedDate
													][0].occurrenceDateTime
												),
												{
													days: parseInt(
														data[
															selectedDate
														][0].note[0].windowBefore.split(
															" "
														)[0]
													),
												}
											)
												.toLocaleString("en-AU", {
													timeZone:
														Intl.DateTimeFormat().resolvedOptions()
															.timeZone,
												})
												.split(",")[0]
										}
									</article>
									<article>
										Window After:{" "}
										{
											data[selectedDate][0].note[0]
												.windowAfter
										}
										<br />
										{
											sub(
												new Date(
													data[
														selectedDate
													][0].occurrenceDateTime
												),
												{
													days: parseInt(
														data[
															selectedDate
														][0].note[0].windowAfter.split(
															" "
														)[0]
													),
												}
											)
												.toLocaleString("en-AU", {
													timeZone:
														Intl.DateTimeFormat().resolvedOptions()
															.timeZone,
												})
												.split(",")[0]
										}
									</article>
								</div>
							</div>
						</React.Fragment>
					)}
				</div>
			</div>
		</React.Fragment>
	)
}

export default Mortality
