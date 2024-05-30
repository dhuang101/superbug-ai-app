import { useEffect, useState } from "react"
import {
	CartesianGrid,
	Bar,
	BarChart,
	ResponsiveContainer,
	XAxis,
	YAxis,
	Label,
	Cell,
} from "recharts"

interface Props {
	data: any
	units: string
}

const colors = ["oklch(var(--p))", "oklch(var(--s))", "oklch(var(--a))"]

function BarGraph(props: Props) {
	const [data, setData] = useState([])

	// marshalls data on component attach
	useEffect(() => {
		console.log(props.data)
		setData(
			props.data
				.map((obj) => {
					return {
						targetTime: obj.note[0].targetTime,
						value: obj.prediction[0].probabilityDecimal * 100,
					}
				})
				// sorts it to ensure columns are in order
				.sort((a, b) =>
					parseInt(a.targetTime.split(" ")[0]) >
					parseInt(b.targetTime.split(" ")[0])
						? 1
						: parseInt(b.targetTime.split(" ")[0]) >
						  parseInt(a.targetTime.split(" ")[0])
						? -1
						: 0
				)
		)
	}, [props.data])

	return (
		<ResponsiveContainer width={"100%"} height={"100%"}>
			<BarChart data={data}>
				<XAxis
					dataKey={"targetTime"}
					tick={{ fill: "oklch(var(--bc))" }}
					height={50}
				>
					<Label value="Target Time" position="insideBottom" />
				</XAxis>
				<YAxis
					unit={props.units}
					width={76}
					tick={{ fill: "oklch(var(--bc))" }}
				/>
				<CartesianGrid strokeDasharray="3 3" vertical={false} />
				<Bar
					dataKey={"value"}
					barSize={150}
					label={{
						fill: "oklch(var(--bc))",
						fontSize: 16,
						position: "top",
						formatter: (value) => value.toFixed(4),
					}}
				>
					{data.map((entry, index) => (
						<Cell key={`cell-${index}`} fill={colors[index % 20]} />
					))}
				</Bar>
			</BarChart>
		</ResponsiveContainer>
	)
}

export default BarGraph
