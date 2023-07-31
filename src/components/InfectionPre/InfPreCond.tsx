import axios from "axios"
import React, { useState, useEffect, useContext, useRef } from "react"
import { useRouter } from "next/router"
import ApiContext from "../../contexts/ApiContext"
import { DatePicker } from "@mui/x-date-pickers"

function InfPreCond() {
	// global state container
	const apiContext = useContext(ApiContext)

	const [groupedConds, setGroupedConds] = useState()

	useEffect(() => {
		// grab list of encounters
		axios
			.get("/api/condition/groupedCount", {
				params: {
					apiUrl: apiContext.value,
				},
			})
			.then((result: any) => {
				setGroupedConds(result.data)
			})
	}, [])

	function handleStartChange() {
		return
	}

	function handleEndChange() {
		return
	}

	function fieldElement() {
		return (
			<input
				type="text"
				placeholder="Type here"
				className="input input-bordered input-primary w-full max-w-xs"
			/>
		)
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
				<article className="mx-4 text-5xl font-thin text-stone-400">
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
