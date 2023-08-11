import axios from "axios"
import React, { useState, useEffect, useContext } from "react"
import ApiContext from "../../contexts/ApiContext"
import { CircularProgress } from "@mui/material"
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined"
import InfPreTable from "./SubComponents/InfPreTable"
import StyledDatePicker from "../StyledDatePicker"

function InfPreCond() {
	// global state container
	const apiContext = useContext(ApiContext)

	const [loading, setLoading] = useState(false)
	const [groupedConds, setGroupedConds] = useState(null)
	const [startDate, setStartDate] = useState(null)
	const [endDate, setEndDate] = useState(null)

	function executeSearch() {
		setLoading(true)
		// TODO: error checking
		// start is greater than start
		// end is greater than now
		// one value entered but not the other

		// grab list of encounters
		axios
			.get("/api/condition/groupedCount", {
				params: {
					apiUrl: apiContext.value,
					start: startDate,
					end: endDate,
				},
			})
			.then((result: any) => {
				setGroupedConds(result.data.parameter)
			})
	}

	// side effect only renders the table once the results are set
	useEffect(() => {
		if (groupedConds != null) {
			setLoading(false)
		}
	}, [groupedConds])

	// event handler for the start date selector
	function handleStartChange(event: { $d: Date }) {
		if (!isNaN(event.$d.getTime())) {
			const offset = event.$d.getTimezoneOffset()
			event.$d = new Date(event.$d.getTime() - offset * 60 * 1000)
			setStartDate(event.$d.toISOString().split("T")[0])
		}
	}

	// event handler for the end date selector
	function handleEndChange(event: { $d: Date }) {
		if (!isNaN(event.$d.getTime())) {
			const offset = event.$d.getTimezoneOffset()
			event.$d = new Date(event.$d.getTime() - offset * 60 * 1000)
			setEndDate(event.$d.toISOString().split("T")[0])
		}
	}

	return (
		<div className="flex flex-col w-full min-h-[70vh]">
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
				<article className="mx-4 text-3xl font-thin text-base-300">
					-
				</article>
				<div className="w-1/5">
					<StyledDatePicker onChange={handleEndChange} label="End" />
				</div>
				<div
					className="tooltip tooltip-accent ml-4 flex"
					data-tip="Search with no dates entered to fetch all conditions. This is a heavy process and can be slow!"
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
			{loading === true ? (
				<div className="flex justify-center items-center h-[90%]">
					<CircularProgress size={80} />
				</div>
			) : groupedConds != null ? (
				<div className="mt-4">
					<InfPreTable name="Condition" searchData={groupedConds} />
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

export default InfPreCond
