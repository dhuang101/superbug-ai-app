import React, { useEffect, useState, useContext } from "react"
import ApiContext from "../../contexts/ApiContext"
import { getObsForEnc } from "../../services/PatientSummary"
import LineGraph from "./SubComponents/LineGraph"
import EncSelect from "./SubComponents/EncSelect"

function Mortality(props: {
	encounters: any[]
	lastEncounter: { current: React.SetStateAction<string> }
}) {
	// global state container
	const apiContext = useContext(ApiContext)

	// state variables
	const [selectedEnc, setSelectedEnc] = useState("")
	const [data, setData] = useState([])

	// once a valid encounter is selected grabs the
	// corresponding observations
	useEffect(() => {
		if (selectedEnc !== "") {
			getObsForEnc(
				apiContext.value,
				props.encounters[selectedEnc].resource.id,
				"Patient Mortality Rate"
			).then((result: any) => {
				setData(marshallData(result))
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
				<div className="flex items-center justify-center h-[68vh] text-3xl">
					No Recorded Encounters
				</div>
			) : (
				<React.Fragment>
					<div className="flex flex-col min-h-full">
						<article className="mb-6 text-xl font-semibold text-center">
							Predicted Mortality Rate
						</article>
						<EncSelect
							encounters={props.encounters}
							selectedEnc={selectedEnc}
							setSelectedEnc={setSelectedEnc}
						/>
						<div className="h-1/2 mt-4">
							<LineGraph data={data} tooltip="Mortality Rate" />
						</div>
					</div>
				</React.Fragment>
			)}
		</React.Fragment>
	)
}

export default Mortality
