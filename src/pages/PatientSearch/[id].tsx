import React, { useState, useEffect, useContext, useRef } from "react"
import { useRouter } from "next/router"
import { getEncForPatient } from "../../services/PatientSummary"
import ApiContext from "../../contexts/ApiContext"
import SummaryComponent from "../../components/PatientSummary/SummaryComponent"
import LengthOfStay from "../../components/AiModel/LengthOfStay"
import UnplannedAd from "../../components/AiModel/UnplannedAd"
import IcuAd from "../../components/AiModel/IcuAd"
import Mortality from "../../components/AiModel/Mortality"
import PersonIcon from "@mui/icons-material/Person"
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart"
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"
import LoopIcon from "@mui/icons-material/Loop"
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety"

// 6f7acde5-db81-4361-82cf-886893a3280c
// gregg

function PatientSummary() {
	// const for path param
	const router = useRouter()
	// global state container
	const apiContext = useContext(ApiContext)

	const [encounters, setEncounters] = useState([])
	const [naviValue, setNaviValue] = useState(0)
	const [lastButton, setLastButton] = useState<any>()
	const lastEncounter = useRef("")

	useEffect(() => {
		// splits the path to grab to id
		let id = router.query.id as string
		// grab list of encounters
		getEncForPatient(apiContext.value, id, "inpatient").then(
			(result: any) => {
				setEncounters(result)
			}
		)

		let buttonElement = document.getElementById(
			"button0"
		) as HTMLButtonElement
		buttonElement.disabled = true
		setLastButton(document.getElementById("button0"))
	}, [])

	function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
		let clickedElement = event.target as HTMLButtonElement
		// alter CSS on clicked button
		clickedElement.classList.add("text-blue-500")
		clickedElement.classList.add("bg-blue-100")
		clickedElement.classList.remove("hover:bg-gray-300")
		clickedElement.disabled = true
		// alter CSS on previously clicked button
		lastButton.classList.remove("text-blue-500")
		lastButton.classList.remove("bg-blue-100")
		lastButton.classList.add("hover:bg-gray-300")
		lastButton.disabled = false
		// change displayed component
		setNaviValue(parseInt(clickedElement.value))
		// save last pressed button
		setLastButton(event.target)
	}

	function DisplayHandler() {
		let componentList = [
			<SummaryComponent />,
			<Mortality encounters={encounters} lastEncounter={lastEncounter} />,
			<LengthOfStay
				encounters={encounters}
				lastEncounter={lastEncounter}
			/>,
			<UnplannedAd
				encounters={encounters}
				lastEncounter={lastEncounter}
			/>,
			<IcuAd encounters={encounters} lastEncounter={lastEncounter} />,
		]
		return componentList[naviValue]
	}

	return (
		<div className="flex grow w-full">
			<div className="flex flex-col w-1/5 items-center bg-base-100">
				<button
					id="button0"
					value={0}
					onClick={handleClick}
					className="flex justify-start items-center mt-2 h-11 w-11/12 rounded bg-blue-100 text-blue-500"
				>
					<PersonIcon className="w-1/6 pointer-events-none" />
					<article className="pointer-events-none">
						Patient Summary
					</article>
				</button>
				<button
					id="button1"
					value={1}
					onClick={handleClick}
					className="flex justify-start items-center mt-2 h-11 w-11/12 rounded hover:bg-gray-300"
				>
					<MonitorHeartIcon className="w-1/6 pointer-events-none" />
					<article className="pointer-events-none">Mortality</article>
				</button>
				<button
					id="button2"
					value={2}
					onClick={handleClick}
					className="flex justify-start items-center mt-2 h-11 w-11/12 rounded hover:bg-gray-300"
				>
					<CalendarMonthIcon className="w-1/6 pointer-events-none" />
					<article className="pointer-events-none">
						Length of Stay
					</article>
				</button>
				<button
					id="button3"
					value={3}
					onClick={handleClick}
					className="flex justify-start items-center mt-2 h-11 w-11/12 rounded hover:bg-gray-300"
				>
					<LoopIcon className="w-1/6 pointer-events-none" />
					<article className="pointer-events-none">
						Unplanned Readmission
					</article>
				</button>
				<button
					id="button4"
					value={4}
					onClick={handleClick}
					className="flex justify-start items-center mt-2 h-11 w-11/12 rounded hover:bg-gray-300"
				>
					<HealthAndSafetyIcon className="w-1/6 pointer-events-none" />
					<article className="pointer-events-none">
						ICU Admission
					</article>
				</button>
			</div>
			<div className="flex flex-col w-4/5 items-center overflow-y-auto">
				<div className="flex flex-col w-10/12 py-6 px-12 my-8 min-h-[90%] bg-white rounded">
					<DisplayHandler />
				</div>
			</div>
		</div>
	)
}

export default PatientSummary
