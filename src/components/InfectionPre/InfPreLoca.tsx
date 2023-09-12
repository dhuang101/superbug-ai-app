import axios from "axios"
import React, { useState, useEffect, useContext } from "react"
import ApiContext from "../../contexts/ApiContext"
import { CircularProgress } from "@mui/material"
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined"
import CountTable from "./SubComponents/CountTable"
import StyledDatePicker from "./SubComponents/StyledDatePicker"
import { group } from "console"

function InfPreLoca() {
	// global state container
	const apiContext = useContext(ApiContext)

	const [loading, setLoading] = useState(false)
	const [errorMessage, setErrorMessage] = useState("")
	const [groupedLocas, setGroupedLocas] = useState(null)
	const [startDate, setStartDate] = useState(null)
	const [endDate, setEndDate] = useState(null)

	function executeSearch() {
		// error checking
		// one value entered but not the other
		if (
			(startDate === null && endDate !== null) ||
			(startDate !== null && endDate === null)
		) {
			setErrorMessage("Error: Both or none of the dates must be entered!")
			return
		}
		// start is greater than end
		else if (startDate > endDate) {
			setErrorMessage(
				"Error: The start date is greater than the end date!"
			)
			return
		}
		// end is greater than now
		else if (endDate > new Date(Date.now()).toISOString().split("T")[0]) {
			setErrorMessage("Error: The end date is greater than today's date!")
			return
		} else {
			setErrorMessage("")
			setLoading(true)
			// grab list of encounters
			axios
				.get("/api/location/groupedCount", {
					params: {
						apiUrl: apiContext.value,
						start: startDate,
						end: endDate,
					},
				})
				.then((result: any) => {
					if (result.hasOwnProperty("data")) {
						setGroupedLocas(result.data)
					} else {
						setGroupedLocas([])
					}
				})
		}
	}

	function OpenSummary(name: string) {
		let returnValue
		let locationObj = groupedLocas.find((obj) => obj.name === name)

		returnValue = locationObj.reports.map((obj) => {
			return {
				patientId: obj.resource.subject.reference.split("/")[1],
				diagnosticCode: obj.resource.code.text,
				organsismCode: obj.resource.conclusionCode[0].coding[0].display,
				issuedDate: new Date(obj.resource.issued)
					.toISOString()
					.split("T")[0],
			}
		})

		return [
			returnValue,
			["Patient ID", "Diagnostic Code", "Organism Code", "Date Issued"],
		]
	}

	// side effect only renders the table once the results are set
	useEffect(() => {
		if (groupedLocas != null) {
			setLoading(false)
		}
	}, [groupedLocas])

	// event handler for the start date selector
	function handleStartChange(event: { $d: Date }) {
		if (event === null) {
			return
		}
		if (!isNaN(event.$d.getTime())) {
			const offset = event.$d.getTimezoneOffset()
			let adjustedISODate = new Date(
				event.$d.getTime() - offset * 60 * 1000
			)
			setStartDate(adjustedISODate.toISOString().split("T")[0])
		}
	}

	// event handler for the end date selector
	function handleEndChange(event: { $d: Date }) {
		if (event === null) {
			return
		}
		if (!isNaN(event.$d.getTime())) {
			const offset = event.$d.getTimezoneOffset()
			let adjustedISODate = new Date(
				event.$d.getTime() - offset * 60 * 1000
			)
			setEndDate(adjustedISODate.toISOString().split("T")[0])
		}
	}

	return (
		<div className="flex flex-col w-full min-h-[67vh]">
			<article className="mb-4 text-xl font-normal">
				Enter Date Range
			</article>
			<div className="flex">
				<div className="w-1/5">
					<StyledDatePicker
						onChange={handleStartChange}
						label="Start"
					/>
				</div>
				<article className="mx-4 text-3xl font-thin text-base-content">
					-
				</article>
				<div className="w-1/5">
					<StyledDatePicker onChange={handleEndChange} label="End" />
				</div>
				<div
					className="tooltip tooltip-accent ml-4 flex"
					data-tip="Search with no dates entered to fetch all locations. This is a heavy process and can be slow!"
				>
					<InfoOutlinedIcon className="my-auto" />
				</div>
				<div className="ml-auto">
					<button
						className="btn btn-sm rounded btn-primary h-full"
						onClick={executeSearch}
					>
						Search
					</button>
				</div>
			</div>
			<article className="my-2 pl-8 h-6 text-error font-semibold">
				{errorMessage}
			</article>
			{loading === true ? (
				<div className="flex justify-center items-center h-[90%]">
					<CircularProgress size={80} />
				</div>
			) : groupedLocas != null ? (
				<div>
					<CountTable
						name="Location"
						searchData={groupedLocas}
						OpenSummary={OpenSummary}
					/>
				</div>
			) : (
				<div className="flex justify-center items-center h-[90%]">
					<article className="text-3xl">
						Perform a Search First
					</article>
				</div>
			)}
		</div>
	)
}

export default InfPreLoca
