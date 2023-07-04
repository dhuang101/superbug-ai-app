import React, { useEffect, useReducer } from "react"
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

// reducer used to handle complex state for the line graph
const initialState = {
	data: [], // the original fetched data
	slicedData: [], // the data that is used to draw the graph
	// 2 values saved to state to allow the data to be sliced for zooming
	limit1: null,
	limit2: null,
}

// state logic
const reducer = (state, action) => {
	switch (action.type) {
		case "INITIALISE":
			return {
				data: action.data,
				slicedData: action.data,
				limit1: null,
				limit2: null,
			}
		case "ADD_LIMIT":
			if (state.limit1 === null) {
				return { ...state, limit1: action.limit }
			} else {
				return { ...state, limit2: action.limit }
			}
		case "RESET_LIMITS":
			return {
				...state,
				limit1: null,
				limit2: null,
			}
		case "SLICE_DATA":
			let limits = [state.limit1.index, state.limit2.index].sort()
			let limitedList = state.slicedData.slice(limits[0], limits[1] + 1)
			if (limitedList.length > 1) {
				return {
					...state,
					slicedData: limitedList,
					limit1: null,
					limit2: null,
				}
			}
		case "RESET_GRAPH":
			return {
				...state,
				slicedData: state.data,
				limit1: null,
				limit2: null,
			}
		default:
			return state
	}
}

function LineGraph(props: any) {
	const [graphState, dispatch] = useReducer(reducer, initialState)

	useEffect(() => {
		dispatch({ type: "INITIALISE", data: props.data })
	}, [props])

	return (
		<React.Fragment>
			{props.data.length === 0 ? (
				<div className="flex items-center justify-center h-[60vh] text-3xl">
					Encounter Has No Observations
				</div>
			) : (
				<div className="h-full">
					<button
						className="btn btn-sm rounded btn-primary mb-2 ml-20"
						onClick={() => {
							dispatch({
								type: "RESET_GRAPH",
							})
						}}
					>
						Zoom Out
					</button>
					<ResponsiveContainer width={"100%"} height={"100%"}>
						<LineChart
							data={graphState.slicedData}
							margin={{
								top: 5,
								right: 41,
								left: 20,
								bottom: 5,
							}}
							onMouseDown={(event: any) => {
								if (event !== null) {
									dispatch({
										type: "ADD_LIMIT",
										limit: {
											value: event.activeLabel,
											index: event.activeTooltipIndex,
										},
									})
								}
							}}
							onMouseMove={(event: any) => {
								if (event && graphState.limit1) {
									dispatch({
										type: "ADD_LIMIT",
										limit: {
											value: event.activeLabel,
											index: event.activeTooltipIndex,
										},
									})
								}
							}}
							onMouseUp={(event: any) => {
								if (
									graphState.limit1 !== null &&
									graphState.limit2 !== null
								) {
									dispatch({
										type: "SLICE_DATA",
									})
								} else {
									dispatch({
										type: "RESET_LIMITS",
									})
								}
							}}
						>
							<Line
								type="monotone"
								dataKey="value"
								stroke="#3b82f6"
								animationDuration={300}
							/>
							<Tooltip
								labelFormatter={(label) => {
									return new Date(label).toLocaleString(
										"en-AU",
										{
											timeZone:
												Intl.DateTimeFormat().resolvedOptions()
													.timeZone,
										}
									)
								}}
								formatter={(value) => [
									value + "%",
									"Mortality Rate",
								]}
							/>
							<CartesianGrid
								stroke="#ccc"
								strokeDasharray="3 3"
							/>
							<XAxis
								dataKey="issued"
								dy={8}
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
							<YAxis unit={"%"} domain={[0, 100]} />
							{graphState.limit1 !== null &&
							graphState.limit2 !== null ? (
								<ReferenceArea
									x1={graphState.limit1.value}
									x2={graphState.limit2.value}
									strokeOpacity={0.3}
								/>
							) : null}
						</LineChart>
					</ResponsiveContainer>
				</div>
			)}
		</React.Fragment>
	)
}

export default LineGraph
