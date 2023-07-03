import React from "react"
import {
	CartesianGrid,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts"

function LineGraph(props: { data: any[] }) {
	return (
		<React.Fragment>
			{props.data.length > 0 ? (
				<ResponsiveContainer width={"100%"} height={"100%"}>
					<LineChart
						data={props.data}
						margin={{
							top: 5,
							right: 41,
							left: 20,
							bottom: 5,
						}}
					>
						<Line
							type="monotone"
							dataKey="value"
							stroke="#3b82f6"
						/>
						<Tooltip
							labelFormatter={(label) => {
								return new Date(label).toLocaleString("en-AU", {
									timeZone:
										Intl.DateTimeFormat().resolvedOptions()
											.timeZone,
								})
							}}
							formatter={(value) => [
								value + "%",
								"Mortality Rate",
							]}
						/>
						<CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
						<XAxis
							dataKey="issued"
							dy={6}
							tickFormatter={(tick) => {
								return new Date(tick).toLocaleDateString(
									"en-AU",
									{
										timeZone:
											Intl.DateTimeFormat().resolvedOptions()
												.timeZone,
									}
								)
							}}
						/>
						<YAxis
							tickFormatter={(tick) => {
								return tick + "%"
							}}
						/>
					</LineChart>
				</ResponsiveContainer>
			) : (
				<div className="flex items-center justify-center h-[60vh] text-3xl">
					Encounter Has No Observations
				</div>
			)}
		</React.Fragment>
	)
}

export default LineGraph
