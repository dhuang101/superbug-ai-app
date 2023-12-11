import { add, format, differenceInCalendarDays } from "date-fns"
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

function GanttChart() {
	// test data
	const startDate = new Date(2019, 4, 15)
	const endDate = new Date(2019, 7, 1)
	const data = [
		{
			name: "Patient A",
			dateRange: [new Date(2019, 4, 25), new Date(2019, 4, 30)],
		},
		{
			name: "Patient B",
			dateRange: [new Date(2019, 4, 21), new Date(2019, 5, 30)],
		},
		{
			name: "Patient C",
			dateRange: [new Date(2019, 4, 15), new Date(2019, 6, 21)],
		},
		{
			name: "Patient D",
			dateRange: [new Date(2019, 4, 18), new Date(2019, 6, 28)],
		},
	]

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
	const domain = [ticks[0], ticks[ticks.length - 1]]

	return (
		<ResponsiveContainer width="100%" height="100%">
			<BarChart
				data={data}
				layout="vertical"
				margin={{
					right: 40,
				}}
			>
				<CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
				<XAxis
					type="number"
					scale="time"
					tickFormatter={dateFormatter}
					ticks={ticks}
					domain={domain}
					dataKey={dateToData}
				/>
				<YAxis type="category" dataKey="name" />
				<Tooltip
					formatter={(value: number[]) => {
						return [
							format(new Date(value[0]), "dd/MM/yyyy") +
								" - " +
								format(new Date(value[1]), "dd/MM/yyyy"),
							"Dates of Stay",
						]
					}}
				/>
				<Bar
					barSize={80}
					dataKey={dateToData}
					fill="#8884d8"
					activeBar={<Rectangle stroke="blue" />}
				/>
			</BarChart>
		</ResponsiveContainer>
	)
}

export default GanttChart
