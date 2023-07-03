import React, { useState } from "react"
import {
	CartesianGrid,
	Line,
	LineChart,
	ReferenceArea,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts"

function LineGraph(props) {
	const [graphState, setGraphState] = useState({
		data: props.data,
		left: "dataMin",
		right: "dataMax",
		refAreaLeft: "",
		refAreaRight: "",
		top: "dataMax+1",
		bottom: "dataMin-1",
		animation: true,
	})

	function getAxisYDomain(
		from: number,
		to: number,
		ref: string,
		offset: number
	) {
		const refData: any[] = props.data.slice(from - 1, to)
		let [bottom, top] = [refData[0][ref], refData[0][ref]]

		refData.forEach((d) => {
			if (d[ref] > top) top = d[ref]
			if (d[ref] < bottom) bottom = d[ref]
		})

		return [(bottom | 0) - offset, (top | 0) + offset]
	}

	function zoom() {
		let { refAreaLeft, refAreaRight } = graphState
		const { data } = graphState

		if (refAreaLeft === refAreaRight || refAreaRight === "") {
			setGraphState({ ...graphState, refAreaLeft: "", refAreaRight: "" })
			return
		}

		// xAxis domain
		if (refAreaLeft > refAreaRight)
			[refAreaLeft, refAreaRight] = [refAreaRight, refAreaLeft]

		// yAxis domain
		const [bottom, top] = getAxisYDomain(
			refAreaLeft,
			refAreaRight,
			"value",
			1
		)

		setGraphState({
			...graphState,
			refAreaLeft: "",
			refAreaRight: "",
			data: data.slice(),
			left: refAreaLeft,
			right: refAreaRight,
			bottom: bottom.toString(),
			top: top.toString(),
		})
	}

	function zoomOut() {
		const { data } = graphState
		setGraphState({
			...graphState,
			data: props.data.slice(),
			refAreaLeft: "",
			refAreaRight: "",
			left: "dataMin",
			right: "dataMax",
			top: "dataMax+1",
			bottom: "dataMin",
		})
	}

	return (
		<div className="h-full select-none">
			<button type="button" className="btn update" onClick={zoomOut}>
				Zoom Out
			</button>
			<ResponsiveContainer width={"100%"} height={"100%"}>
				<LineChart
					data={graphState.data}
					margin={{
						top: 5,
						right: 41,
						left: 20,
						bottom: 5,
					}}
					onMouseDown={(e: any) =>
						setGraphState({
							...graphState,
							refAreaLeft: e.activeTooltipIndex,
						})
					}
					onMouseMove={(e: any) =>
						graphState.refAreaLeft &&
						setGraphState({
							...graphState,
							refAreaRight: e.activeTooltipIndex,
						})
					}
					// eslint-disable-next-line react/jsx-no-bind
					onMouseUp={zoom}
				>
					<Line
						type="monotone"
						dataKey="value"
						stroke="#3b82f6"
						animationDuration={300}
					/>
					<Tooltip
						formatter={(value) => [value + "%", "Mortality Rate"]}
					/>
					<CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
					<XAxis
						dataKey="issued"
						dy={6}
						tickFormatter={(tick) => {
							return new Date(tick).toLocaleDateString("en-AU", {
								timeZone:
									Intl.DateTimeFormat().resolvedOptions()
										.timeZone,
							})
						}}
					/>
					<YAxis
						allowDataOverflow
						domain={[graphState.bottom, graphState.top]}
						tickFormatter={(tick) => {
							return tick + "%"
						}}
					/>
					{graphState.refAreaLeft && graphState.refAreaRight ? (
						<ReferenceArea
							yAxisId="1"
							x1={graphState.refAreaLeft}
							x2={graphState.refAreaRight}
							strokeOpacity={0.3}
						/>
					) : null}
				</LineChart>
			</ResponsiveContainer>
		</div>
	)
}

export default LineGraph
