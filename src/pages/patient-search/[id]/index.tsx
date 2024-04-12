import React, { useState, useEffect, useRef } from "react"
import SummaryComponent from "../../../components/PatientSummary/SummaryComponent"
import LengthOfStay from "../../../components/AiModel/LengthOfStay"
import UnplannedAd from "../../../components/AiModel/UnplannedAd"
import IcuAd from "../../../components/AiModel/IcuAd"
import Mortality from "../../../components/AiModel/Mortality"
import PersonIcon from "@mui/icons-material/Person"
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart"
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"
import LoopIcon from "@mui/icons-material/Loop"
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety"
import Breadcrumbs from "../../../components/Breadcrumbs"

function PatientSummary() {
	const [naviValue, setNaviValue] = useState(0)
	const lastButton = useRef<HTMLButtonElement>()

	useEffect(() => {
		// set button element for side menu
		let buttonElement = document.getElementById(
			"button0"
		) as HTMLButtonElement
		buttonElement.disabled = true
		lastButton.current = document.getElementById(
			"button0"
		) as HTMLButtonElement
	}, [])

	function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
		let clickedElement = event.target as HTMLButtonElement
		// alter CSS on clicked button
		clickedElement.classList.add("text-neutral-content")
		clickedElement.classList.add("bg-neutral")
		clickedElement.classList.remove("hover:bg-base-300")
		clickedElement.disabled = true
		// alter CSS on previously clicked button
		lastButton.current.classList.remove("text-neutral-content")
		lastButton.current.classList.remove("bg-neutral")
		lastButton.current.classList.add("hover:bg-base-300")
		lastButton.current.disabled = false
		// change displayed component
		setNaviValue(parseInt(clickedElement.value))
		// save last pressed button
		lastButton.current = clickedElement
	}

	function DisplayHandler() {
		let componentList = [
			<SummaryComponent />,
			<Mortality />,
			<LengthOfStay />,
			<UnplannedAd />,
			<IcuAd />,
		]
		return componentList[naviValue]
	}

	return (
		<div className="flex h-full w-full">
			<div className="flex flex-col w-1/5 items-center bg-base-200">
				<button
					id="button0"
					value={0}
					onClick={handleClick}
					className="flex justify-start items-center mt-2 h-11 w-11/12 rounded bg-neutral text-neutral-content"
				>
					<PersonIcon className="mx-2 pointer-events-none" />
					<article className="pointer-events-none">
						Patient Summary
					</article>
				</button>
				<button
					id="button1"
					value={1}
					onClick={handleClick}
					className="flex justify-start items-center mt-2 h-11 w-11/12 rounded hover:bg-base-300"
				>
					<MonitorHeartIcon className="mx-2 pointer-events-none" />
					<article className="pointer-events-none">Mortality</article>
				</button>
				<button
					id="button2"
					value={2}
					onClick={handleClick}
					className="flex justify-start items-center mt-2 h-11 w-11/12 rounded hover:bg-base-300"
				>
					<CalendarMonthIcon className="mx-2 pointer-events-none" />
					<article className="pointer-events-none">
						Length of Stay
					</article>
				</button>
				<button
					id="button3"
					value={3}
					onClick={handleClick}
					className="flex justify-start items-center mt-2 h-11 w-11/12 rounded hover:bg-base-300"
				>
					<LoopIcon className="mx-2 pointer-events-none" />
					<article className="pointer-events-none">
						Unplanned Readmission
					</article>
				</button>
				<button
					id="button4"
					value={4}
					onClick={handleClick}
					className="flex justify-start items-center mt-2 h-11 w-11/12 rounded hover:bg-base-300"
				>
					<HealthAndSafetyIcon className="mx-2 pointer-events-none" />
					<article className="pointer-events-none">
						ICU Admission
					</article>
				</button>
			</div>
			<div className="flex flex-col w-4/5 items-center overflow-y-auto">
				<div className="flex flex-col w-10/12 h-fit">
					<Breadcrumbs />
					<div className="flex flex-col w-full mt-4 mb-8 py-6 px-12 min-h-fit bg-base-100 rounded">
						<DisplayHandler />
					</div>
				</div>
			</div>
		</div>
	)
}

export default PatientSummary
