import { add, format, differenceInCalendarDays } from "date-fns"
import { CircularProgress } from "@mui/material"
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

interface Props {
	data: any
	startDate: any
	endDate: any
}

function GanttChart(props: Props) {
	const startDate = new Date(props.startDate)
	const endDate = new Date(props.endDate)
	const [data, setData] = useState([])
	const [cursorPos, setCursorPos] = useState(0)
	const graphContainer = useRef(null)

	useEffect(() => {
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
								dateRange: [elementStart, elementEnd],
							}
							cleanData.push(formattedEntry)
						}
					}
				)
			}
		)
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

		let current = startDate,
			velocity = Math.round(diffDays / (num - 1))

		const ticks = [startDate.getTime()]

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

	function CustomTooltip({ payload, label, active }) {
		if (active) {
			return (
				<div className="p-2 rounded outline outline-2 outline-slate-300 bg-slate-50">
					<p className="text-primary text-xs">{`Patient ID: ${label}`}</p>
					<p className="text-neutral text-xs">
						{"Dates of Stay: " +
							format(
								new Date(payload[0].value[0]),
								"dd/MM/yyyy"
							) +
							" - " +
							format(new Date(payload[0].value[1]), "dd/MM/yyyy")}
					</p>
					<p className="text-accent text-xs">
						{"Cursor Position: " +
							format(new Date(cursorPos), "dd/MM/yyyy")}
					</p>
				</div>
			)
		}

		return null
	}

	// const value for allocating ticks
	const ticks = getTicks(startDate, endDate, 6)

	// calculates and creates graph domain
	const domain = [ticks[0], ticks[ticks.length - 1]]

	return data.length > 0 ? (
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
				onMouseMove={(event: any) => {
					if (event.isTooltipActive) {
						let graphRange =
							graphContainer.current.current.clientWidth -
							40 -
							159
						let percentage = event.activeCoordinate.x - 159
						setCursorPos(
							Math.floor(
								domain[0] +
									((domain[1] - domain[0]) * percentage) /
										graphRange
							)
						)
					}
				}}
				onMouseLeave={() => setCursorPos(0)}
			>
				<CartesianGrid stroke="oklch(var(--s))" strokeDasharray="3 5" />
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
					cursor={{ fill: "rgba(53, 108, 176, .4)" }}
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
	) : (
		<div className="flex flex-col justify-center items-center h-full">
			<article className="text-xl mb-8">Data is Processing</article>
			<CircularProgress size={80} />
		</div>
	)
}

export default GanttChart
