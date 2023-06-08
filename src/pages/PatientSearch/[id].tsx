import React from "react"
import SummaryComponent from "../../components/PatientSummary/SummaryComponent"
import PersonIcon from "@mui/icons-material/Person"
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart"
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"
import LoopIcon from "@mui/icons-material/Loop"
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety"

// e5c6bf5f-772f-4fee-8d72-4d05bca3027d

function PatientSummary() {
	return (
		<div className="flex grow w-full">
			<div className="flex flex-col grow items-center bg-base-100">
				<button
					value={0}
					className="flex justify-start items-center mt-2 h-11 w-11/12 rounded hover:bg-gray-300"
				>
					<PersonIcon className="w-1/6" />
					<article className="">Patient Summary</article>
				</button>
				<button
					value={0}
					className="flex justify-start items-center mt-2 h-11 w-11/12 rounded hover:bg-gray-300"
				>
					<MonitorHeartIcon className="w-1/6" />
					<article>Mortality</article>
				</button>
				<button
					value={0}
					className="flex justify-start items-center mt-2 h-11 w-11/12 rounded hover:bg-gray-300"
				>
					<CalendarMonthIcon className="w-1/6" />
					<article>Length of Stay</article>
				</button>
				<button
					value={0}
					className="flex justify-start items-center mt-2 h-11 w-11/12 rounded hover:bg-gray-300"
				>
					<LoopIcon className="w-1/6" />
					<article>Unplanned Readmission</article>
				</button>
				<button
					value={0}
					className="flex justify-start items-center mt-2 h-11 w-11/12 rounded hover:bg-gray-300"
				>
					<HealthAndSafetyIcon className="w-1/6" />
					<article>ICU Admission</article>
				</button>
			</div>
			<div className="flex flex-col w-4/5 items-center justify-center">
				<div className="flex flex-col w-11/12 h-[90%] bg-white rounded">
					<SummaryComponent />
				</div>
			</div>
		</div>
	)
}

export default PatientSummary
