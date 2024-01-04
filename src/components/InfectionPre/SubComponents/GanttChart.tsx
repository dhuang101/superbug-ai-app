import { add, format, differenceInCalendarDays } from "date-fns"
import { CircularProgress } from "@mui/material"
import { useEffect, useState } from "react"
import {
	BarChart,
	Bar,
	Rectangle,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
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

	useEffect(() => {
		props.data.map((obj) => {
			obj.locations.forEach((element) => {
				console.log(obj)
				let elementStart = new Date(element.period.start)
				let elementEnd = new Date(element.period.end)
				if (elementStart > startDate || elementEnd < endDate) {
					let formattedEntry = {
						patientId: obj.patientId,
						encounterId: obj.encounterId,
						dateRange: [elementStart, elementEnd],
					}
					setData([...data, formattedEntry])
				}
			})
		})
	}, [])

	// converts the array of data to an array the graph can read
	function dateToData(data: { dateRange: any[] }) {
		return data.dateRange.map((date) => {
			return date.getTime()
		})
	}

	// produces the ticks between the start and end date for the graph
	function getTicks(startDate, endDate, num) {
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
	function dateFormatter(date) {
		return format(new Date(date), "dd/MM/yyyy")
	}
	const ticks = getTicks(startDate, endDate, 6)
	// calculates and creates graph domain
	const domain = [ticks[0], ticks[ticks.length - 1]]

	return data.length > 0 ? (
		<ResponsiveContainer width="100%" height={data.length * 60 + 30}>
			<BarChart
				data={data}
				layout="vertical"
				margin={{
					right: 40,
				}}
			>
				<CartesianGrid stroke="hsl(var(--s))" strokeDasharray="3 5" />
				<XAxis
					type="number"
					scale="time"
					tickFormatter={dateFormatter}
					ticks={ticks}
					domain={domain}
					dataKey={dateToData}
					stroke="hsl(var(--bc))"
				/>
				<YAxis
					type="category"
					dataKey="patientId"
					width={300}
					stroke="hsl(var(--bc))"
				/>
				<Tooltip
					cursor={{ fill: "hsl(var(--s))" }}
					labelFormatter={(label) => {
						return `Patient ID: ${label}`
					}}
					formatter={(value: number[]) => {
						return [
							format(new Date(value[0]), "dd/MM/yyyy") +
								" - " +
								format(new Date(value[1]), "dd/MM/yyyy"),
							"Dates of Stay",
						]
					}}
					labelStyle={{ color: "hsl(var(--sf))" }}
					itemStyle={{ color: "hsl(var(--b1))" }}
				/>
				<Bar
					barSize={80}
					dataKey={dateToData}
					fill="hsl(var(--pf))"
					activeBar={<Rectangle stroke="hsl(var(--pc))" />}
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
