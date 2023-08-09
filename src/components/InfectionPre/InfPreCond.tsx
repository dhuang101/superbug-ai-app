import axios from "axios"
import React, { useState, useEffect, useContext, useRef } from "react"
import { useRouter } from "next/router"
import ApiContext from "../../contexts/ApiContext"
import { DatePicker } from "@mui/x-date-pickers"
import { group } from "console"

function InfPreCond() {
	// global state container
	const apiContext = useContext(ApiContext)

	const [groupedConds, setGroupedConds] = useState()
	const [startDate, setStartDate] = useState("2012-09-18")
	const [endDate, setEndDate] = useState("2012-09-18")

	useEffect(() => {
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
	}, [])

	useEffect(() => {
		console.log(groupedConds)
	}, [groupedConds])

	function handleStartChange(event) {
		const offset = event.$d.getTimezoneOffset()
		event.$d = new Date(event.$d.getTime() - offset * 60 * 1000)
		setStartDate(event.$d.toISOString().split("T")[0])
	}

	function handleEndChange(event) {
		const offset = event.$d.getTimezoneOffset()
		event.$d = new Date(event.$d.getTime() - offset * 60 * 1000)
		setEndDate(event.$d.toISOString().split("T")[0])
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
			</div>
		</div>
	)
}

export default InfPreCond
