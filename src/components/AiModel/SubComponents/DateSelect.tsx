import React, { ChangeEvent } from "react"

function DateSelect(props: {
	encounters: any[]
	selectedDate: string | number | readonly string[]
	setSelectedDate: (arg0: string) => void
}) {
	function handleSelect(event: ChangeEvent<HTMLSelectElement>): void {
		props.setSelectedDate(event.target.value)
	}

	// generates the options for the select
	function SelectOptions() {
		return (
			<React.Fragment>
				<option disabled value={""}>
					Prediction Selection
				</option>
				{props.encounters.map((obj: any, i: number) => {
					let display =
						new Date(obj.resource.plannedStartDate).toLocaleString(
							"en-AU",
							{
								timeZone:
									Intl.DateTimeFormat().resolvedOptions()
										.timeZone,
							}
						) +
						" - " +
						new Date(obj.resource.plannedEndDate).toLocaleString(
							"en-AU",
							{
								timeZone:
									Intl.DateTimeFormat().resolvedOptions()
										.timeZone,
							}
						)
					return (
						<option value={i} key={i}>
							{display}
						</option>
					)
				})}
			</React.Fragment>
		)
	}

	return (
		<select
			className="select select-bordered max-w-sm ml-20"
			onChange={handleSelect}
			value={props.selectedDate}
		>
			<SelectOptions />
		</select>
	)
}
export default DateSelect
