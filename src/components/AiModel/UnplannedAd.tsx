import axios from "axios"
import React, { useEffect, useState, useContext } from "react"
import LineGraph from "./SubComponents/LineGraph"
import DateSelect from "./SubComponents/DateSelect"
import { GlobalContext } from "../../contexts/GlobalStore"

function UnplannedAd(props: {
	encounters: any[]
	lastEncounter: { current: React.SetStateAction<string> }
}) {
	// global state container
	const [globalState, dispatch] = useContext(GlobalContext)

	// state variables
	const [selectedEnc, setSelectedEnc] = useState("")
	const [data, setData] = useState([])

	// once a valid encounter is selected grabs the
	// corresponding observations
	useEffect(() => {
		if (selectedEnc !== "") {
			axios
				.get("/api/observation/byEncounter", {
					params: {
						apiUrl: globalState.apiUrl,
						encId: props.encounters[selectedEnc].resource.id,
						code: "Unplanned Readmission",
					},
				})
				.then((result: any) => {
					setData(marshallData(result.data))
				})
		}

		return () => {
			props.lastEncounter.current = selectedEnc
		}
	}, [selectedEnc])

	useEffect(() => {
		setSelectedEnc(props.lastEncounter.current)
	}, [])

	// organises data from the fetched observations
	function marshallData(data: any) {
		return data.map((obj: any) => {
			return {
				issued: obj.resource.issued,
				value: obj.resource.valueQuantity.value,
				unit: obj.resource.valueQuantity.unit,
			}
		})
	}

	return (
		<React.Fragment>
			{props.encounters.length === 0 ? (
				<div className="flex items-center justify-center h-[78vh] text-3xl">
					No Recorded Encounters
				</div>
			) : (
				<React.Fragment>
					<div className="flex flex-col min-h-[78vh]">
						<article className="mb-6 text-xl font-semibold text-center">
							Unplanned Readmission
						</article>
						<DateSelect
							encounters={props.encounters}
							selectedDate={selectedEnc}
							setSelectedDate={setSelectedEnc}
						/>
						<div className="h-3/4 mt-4">
							<LineGraph
								data={data}
								tooltip="Unplanned Readmission"
							/>
						</div>
					</div>
				</React.Fragment>
			)}
		</React.Fragment>
	)
}

export default UnplannedAd
