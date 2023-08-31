import React, { useState, useEffect, useRef } from "react"
import InfPreOrga from "../../components/InfectionPre/InfPreOrga"
import InfPreCond from "../../components/InfectionPre/InfPreCond"
import InfPreProc from "../../components/InfectionPre/InfPreProc"
import InfPreLoca from "../../components/InfectionPre/InfPreLoca"

function InfectionPrevention() {
	const [displayedTab, setDisplayedTab] = useState(0)
	const lastButton = useRef<HTMLButtonElement>()

	useEffect(() => {
		lastButton.current = document.getElementById(
			"button0"
		) as HTMLButtonElement
	}, [])

	function handleTabClick(event: React.MouseEvent<HTMLButtonElement>) {
		let clickedElement = event.target as HTMLButtonElement
		// alter CSS on clicked button
		clickedElement.classList.add("tab-active")
		clickedElement.classList.add("pointer-events-none")
		// alter CSS on previously clicked button
		lastButton.current.classList.remove("tab-active")
		lastButton.current.classList.remove("pointer-events-none")
		// change displayed component
		setDisplayedTab(parseInt(clickedElement.value))
		// save last pressed button
		lastButton.current = clickedElement
	}

	function DisplayHandler() {
		let componentList = [
			<InfPreOrga />,
			<InfPreCond />,
			<InfPreProc />,
			<InfPreLoca />,
		]
		return componentList[displayedTab]
	}

	return (
		<div className="flex flex-col w-8/12">
			<div className="mt-6">
				<article className="text-3xl font-semibold">
					Infection Prevention
				</article>
			</div>
			<div className="mt-2 tabs w-full">
				<button
					className="tab tab-bordered tab-active"
					id="button0"
					value={0}
					onClick={handleTabClick}
				>
					Organisms
				</button>
				<button
					className="tab tab-bordered"
					id="button1"
					value={1}
					onClick={handleTabClick}
				>
					Conditions
				</button>
				<button
					className="tab tab-bordered"
					id="button2"
					value={2}
					onClick={handleTabClick}
				>
					Procedures
				</button>
				<button
					className="tab tab-bordered"
					id="button3"
					value={3}
					onClick={handleTabClick}
				>
					Locations
				</button>
			</div>
			<div className="flex min-h-fit py-6 px-12 my-8 bg-base-100 rounded">
				<DisplayHandler />
			</div>
		</div>
	)
}

export default InfectionPrevention
