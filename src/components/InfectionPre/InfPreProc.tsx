import axios from "axios"
import React, { useState, useEffect, useContext, useRef } from "react"
import { CircularProgress } from "@mui/material"
import CountTable from "./SubComponents/CountTable"
import StyledDatePicker from "./SubComponents/StyledDatePicker"
import { GlobalContext } from "../../contexts/GlobalStore"

function InfPreProc() {
	// global state container
	const [globalState, dispatch] = useContext(GlobalContext)

	const [loading, setLoading] = useState(false)
	const [errorMessage, setErrorMessage] = useState("")
	const [groupedProcs, setGroupedProcs] = useState(null)
	const [startDate, setStartDate] = useState(null)
	const [endDate, setEndDate] = useState(null)
	const currentSearchRange = useRef({ start: undefined, end: undefined })

	function executeSearch() {
		// error checking
		// one value entered but not the other
		if (startDate === null || endDate === null) {
			setErrorMessage("Error: Both of the dates must be entered!")
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
				.get("/api/procedure/groupedCount", {
					params: {
						apiUrl: globalState.apiUrl,
						start: startDate,
						end: endDate,
					},
				})
				.then((result: any) => {
					if (result.hasOwnProperty("data")) {
						result.data.sort((a, b) => b.count - a.count)
						setGroupedProcs(result.data)
					} else {
						setGroupedProcs([])
					}
				})
		}
	}

	async function OpenSummary(name: string) {
		// grab data
		let code = groupedProcs.find((obj) => obj.name === name).code
		const result = await axios.get("/api/procedure/searchByCode", {
			params: {
				apiUrl: globalState.apiUrl,
				code: code,
				start: currentSearchRange.current.start,
				end: currentSearchRange.current.end,
			},
		})

		// clean and return the data
		return result.data.entry.map((obj) => {
			return {
				patientId: obj.resource.subject.reference.split("/")[1],
				procedureName: obj.resource.code.text,
				performedDate: new Date(obj.resource.occurrenceDateTime)
					.toISOString()
					.split("T")[0],
			}
		})
	}

	// side effect only renders the table once the results are set
	useEffect(() => {
		if (groupedProcs != null) {
			setLoading(false)
		}
	}, [groupedProcs])

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
				<article className="mx-4 w-[2%] text-center text-3xl font-thin text-base-content">
					-
				</article>
				<div className="w-1/5">
					<StyledDatePicker onChange={handleEndChange} label="End" />
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
			) : groupedProcs != null ? (
				<div>
					<CountTable
						name="procedure"
						searchData={groupedProcs}
						startDate={startDate}
						endDate={endDate}
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

export default InfPreProc
