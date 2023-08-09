import axios from "axios"
import React, { useState, useEffect, useContext } from "react"
import ApiContext from "../../contexts/ApiContext"
import { DatePicker } from "@mui/x-date-pickers"
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined"

function InfPreCond() {
	// global state container
	const apiContext = useContext(ApiContext)

	const [groupedConds, setGroupedConds] = useState()
	const [startDate, setStartDate] = useState(null)
	const [endDate, setEndDate] = useState(null)

	function executeSearch() {
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
				setGroupedConds(result.data)
			})
	}

	useEffect(() => {
		console.log(groupedConds)
	}, [groupedConds])

	function handleStartChange(event) {
		if (!isNaN(event.$d.getTime())) {
			const offset = event.$d.getTimezoneOffset()
			event.$d = new Date(event.$d.getTime() - offset * 60 * 1000)
			setStartDate(event.$d.toISOString().split("T")[0])
		}
	}

	function handleEndChange(event) {
		if (!isNaN(event.$d.getTime())) {
			const offset = event.$d.getTimezoneOffset()
			event.$d = new Date(event.$d.getTime() - offset * 60 * 1000)
			setEndDate(event.$d.toISOString().split("T")[0])
		}
	}

	return (
		<div className="flex flex-col grow">
			<article className="mb-4 text-xl font-normal">
				Enter Date Range
			</article>
			<div className="flex">
				<div className="w-1/5">
					<DatePicker
						slotProps={{ textField: { size: "small" } }}
						onChange={handleStartChange}
						openTo="year"
						format="DD/MM/YYYY"
						label="Start"
					/>
				</div>
				<article className="mx-4 text-3xl font-thin text-stone-400">
					-
				</article>
				<div className="w-1/5">
					<DatePicker
						slotProps={{ textField: { size: "small" } }}
						onChange={handleEndChange}
						openTo="year"
						format="DD/MM/YYYY"
						label="End"
					/>
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
		</div>
	)
}

export default InfPreCond
