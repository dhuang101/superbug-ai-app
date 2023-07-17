import React, { ChangeEvent } from "react"

function EncSelect(props: {
	encounters: any[]
	selectedEnc: string | number | readonly string[]
	setSelectedEnc: (arg0: string) => void
}) {
	function handleSelect(event: ChangeEvent<HTMLSelectElement>): void {
		props.setSelectedEnc(event.target.value)
	}

	// generates the options for the select
	function SelectOptions() {
		return (
			<React.Fragment>
				<option disabled value={""}>
					Encounter Selection
				</option>
				{props.encounters.map((obj: any, i: number) => {
					let display =
						new Date(obj.resource.period.start).toLocaleString(
							"en-AU",
							{
								timeZone:
									Intl.DateTimeFormat().resolvedOptions()
										.timeZone,
							}
						) +
						" - " +
						new Date(obj.resource.period.end).toLocaleString(
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
			value={props.selectedEnc}
		>
			<SelectOptions />
		</select>
	)
}
export default EncSelect
