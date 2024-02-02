import { add, format, differenceInCalendarDays } from "date-fns"
import { CircularProgress } from "@mui/material"
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined"
import { useEffect, useState, useRef } from "react"
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
	Cell,
	ReferenceLine,
} from "recharts"
import React from "react"

interface Props {
	data: any
	startDate: any
	endDate: any
}

function GanttChart(props: Props) {
	const startDate = new Date(props.startDate)
	const endDate = new Date(props.endDate)
	const [data, setData] = useState([])
	const [mode, setMode] = useState("")
	const [cursorPos, setCursorPos] = useState(0)
	const [overlapCount, setOverlapCount] = useState(0)
	const originalData = useRef([])
	const graphContainer = useRef(null)
	const zoomButton = useRef(null)
	const filterButton = useRef(null)

	// const value for allocating ticks
	const ticks = getTicks(startDate, endDate, 6)

	// calculates and creates graph domain
	const domain = [ticks[0], ticks[ticks.length - 1]]

	// runs on component mount
	useEffect(() => {
		// cleans the data from the api call to be usable by the gantt chart
		let cleanData = []
		props.data.map(
			(obj: { locations: any[]; patientId: any; encounterId: any }) => {
				obj.locations.forEach(
					(element: {
						period: {
							start: string | number | Date
							end: string | number | Date
						}
					}) => {
						let elementStart = new Date(element.period.start)
						let elementEnd = new Date(element.period.end)
						if (
							(elementStart > startDate &&
								elementStart < endDate) ||
							(elementEnd > startDate && elementEnd < endDate)
						) {
							let formattedEntry = {
								patientId: obj.patientId,
								encounterId: obj.encounterId,
								dateRange: [
									[elementStart, startDate].reduce((a, b) => {
										return a < b ? b : a
									}),
									[elementEnd, endDate].reduce((a, b) => {
										return a > b ? b : a
									}),
								],
								originalRange: [elementStart, elementEnd],
							}
							cleanData.push(formattedEntry)
						}
					}
				)
			}
		)
		originalData.current = [...cleanData]
		setData(cleanData)
	}, [])

	// converts the array of data to an array the graph can read
	function dateToData(data: { dateRange: any[] }) {
		return data.dateRange.map((date) => {
			return date.getTime()
		})
	}

	// produces the ticks between the start and end date for the graph
	function getTicks(startDate: Date, endDate: Date, num: number) {
		const diffDays = differenceInCalendarDays(endDate, startDate)
		const ticks = [startDate.getTime()]
		let current = startDate
		let velocity = Math.round(diffDays / (num - 1))

		for (let i = 1; i < num - 1; i++) {
			ticks.push(add(current, { days: i * velocity }).getTime())
		}
		ticks.push(endDate.getTime())
		return ticks
	}

	// formats the ticks display
	function dateFormatter(date: string | number | Date) {
		return format(new Date(date), "dd/MM/yyyy")
	}

	// formats the patient's id on the y-axis to create more space
	function patientFormatter(patient: string) {
		return (
			patient.substring(0, patient.length / 2) +
			"\n" +
			patient.substring(patient.length / 2, patient.length)
		)
	}

	// generated grouped colours for each bar
	function colourGenerator(patientId: string) {
		// converts the string into a int
		let seed = ""
		for (let i = 0; i < patientId.length; i++) {
			let char = patientId.slice(i, i + 1)
			seed += char.charCodeAt(0)
		}
		// uses that int as a seed to generate a random 6 digit int
		let colour = Math.floor(
			Math.abs(Math.sin(parseInt(seed)) * 16777215)
		).toString(16)
		// returns as a hex code
		return "#" + colour
	}

	// function that handles the cursor hoving over the gantt chart
	function handleGraphHover(event) {
		if (event.isTooltipActive) {
			// calculates the floating line
			let graphRange =
				graphContainer.current.current.clientWidth - 40 - 159
			let percentage = event.activeCoordinate.x - 159
			let epochValue = Math.floor(
				domain[0] + ((domain[1] - domain[0]) * percentage) / graphRange
			)
			setCursorPos(epochValue)
			// calculates the number of overlaps on the floating lines current position
			let dateValue = new Date(epochValue)
			let overlapCount = 0
			data.forEach((datapoint) => {
				if (
					dateValue > datapoint.dateRange[0] &&
					dateValue < datapoint.dateRange[1]
				) {
					overlapCount++
				}
			})
			setOverlapCount(overlapCount)
		} else {
			setCursorPos(0)
		}
	}

	function handleGraphClick(event) {
		if (mode === "filter") {
			data.splice(event.activeTooltipIndex, 1)
		} else if (mode === "zoom") {
		}
	}

	function handleZoomButton() {
		if (mode === "zoom") {
			zoomButton.current.classList.add("btn-neutral")
			zoomButton.current.classList.remove("btn-success")
			setMode("")
		} else {
			if (mode === "filter") {
				filterButton.current.classList.add("btn-neutral")
				filterButton.current.classList.remove("btn-success")
			}
			zoomButton.current.classList.add("btn-success")
			zoomButton.current.classList.remove("btn-neutral")
			setMode("zoom")
		}
	}

	function handleFilterButton() {
		if (mode === "filter") {
			// alter CSS on clicked button
			filterButton.current.classList.add("btn-neutral")
			filterButton.current.classList.remove("btn-success")
			setMode("")
		} else {
			if (mode === "zoom") {
				zoomButton.current.classList.add("btn-neutral")
				zoomButton.current.classList.remove("btn-success")
			}
			filterButton.current.classList.add("btn-success")
			filterButton.current.classList.remove("btn-neutral")
			setMode("filter")
		}
	}

	// custom component for the tooltip that appears on hover
	function CustomTooltip({ payload, label, active }) {
		if (active && payload.length > 0) {
			let originalDates = payload[0].payload.originalRange.map((date) => {
				return date.getTime()
			})

			return (
				<div className="p-2 rounded outline outline-2 outline-slate-300 bg-slate-50">
					<article className="text-primary text-xs">{`Patient ID: ${label}`}</article>
					<article className="text-neutral text-xs">
						{"Dates of Stay: " +
							format(new Date(originalDates[0]), "dd/MM/yyyy") +
							" - " +
							format(new Date(originalDates[1]), "dd/MM/yyyy")}
					</article>
					<article className="text-accent text-xs">
						{"Cursor Position: " +
							format(new Date(cursorPos), "dd/MM/yyyy")}
					</article>
					<article className="text-accent text-xs">
						{"Overlap Count: " + overlapCount}
					</article>
				</div>
			)
		}
		return null
	}

	return data.length > 0 ? (
		<div className="flex flex-col">
			<div className="absolute right-[6%] top-[30%] w-36">
				<div className="flex flex-col">
					<div className="flex justify-between">
						<button
							className="btn btn-sm btn-neutral"
							onClick={handleZoomButton}
							ref={zoomButton}
						>
							Zoom
						</button>
						<button
							className="btn btn-sm btn-neutral ml-3"
							onClick={handleFilterButton}
							ref={filterButton}
						>
							Filter
						</button>
					</div>
					<div className="flex w-full justify-center align-middle mt-2 h-7">
						{mode === "filter" ? (
							<React.Fragment>
								<article className="text-lg font-semibold text-success">
									Filter Active
								</article>
								<div
									className="tooltip tooltip-left tooltip-primary ml-2 flex"
									data-tip="Click on any row to remove it from view"
								>
									<InfoOutlinedIcon className="my-auto" />
								</div>
							</React.Fragment>
						) : mode === "zoom" ? (
							<React.Fragment>
								<article className="text-lg font-semibold text-success">
									Zoom Active
								</article>
								<div
									className="tooltip tooltip-left tooltip-primary ml-2 flex"
									data-tip="Inactive Feature"
								>
									<InfoOutlinedIcon className="my-auto" />
								</div>
							</React.Fragment>
						) : null}
					</div>
					{data.length < originalData.current.length ? (
						<button
							className="btn btn-sm btn-error mt-2"
							onClick={() => {
								setData([...originalData.current])
							}}
						>
							Reset Filter
						</button>
					) : null}
				</div>
			</div>
			<ResponsiveContainer
				width="100%"
				height={data.length * 60 + 200}
				ref={graphContainer}
			>
				<BarChart
					data={data}
					layout="vertical"
					margin={{
						left: 9,
						right: 40,
					}}
					onMouseMove={handleGraphHover}
					onMouseDown={handleGraphClick}
				>
					<CartesianGrid
						stroke="oklch(var(--s))"
						strokeDasharray="3 5"
					/>
					<XAxis
						type="number"
						scale="time"
						tickFormatter={dateFormatter}
						ticks={ticks}
						domain={domain}
						dataKey={dateToData}
						stroke="oklch(var(--bc))"
					/>
					<YAxis
						type="category"
						dataKey="patientId"
						width={150}
						tickFormatter={patientFormatter}
						stroke="oklch(var(--bc))"
					/>
					<Tooltip
						content={CustomTooltip}
						animationDuration={400}
						cursor={{ fill: "rgba(53, 108, 176, .2)" }}
					/>
					<Bar barSize={60} dataKey={dateToData}>
						{data.map((entry, index) => (
							<Cell
								key={index}
								fill={colourGenerator(entry.patientId)}
							/>
						))}
					</Bar>
					<ReferenceLine
						isFront={true}
						strokeWidth={2}
						strokeDasharray="5 3"
						x={cursorPos}
						stroke="oklch(var(--a))"
					/>
				</BarChart>
			</ResponsiveContainer>
		</div>
	) : (
		<div className="flex flex-col justify-center items-center h-full">
			<article className="text-xl mb-8">Data is Processing</article>
			<CircularProgress size={80} />
		</div>
	)
}

export default GanttChart
