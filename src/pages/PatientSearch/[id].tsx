import { useState, useEffect } from "react"
import PersonIcon from "@mui/icons-material/Person"
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart"
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"
import LoopIcon from "@mui/icons-material/Loop"
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety"
import PatientDetails from "../../components/PatientSummary/PatientDetails"

function PatientSummary() {
	const [patientData, setPatientData] = useState()

	useEffect(() => {
		setPatientData(
			JSON.parse(window.sessionStorage.getItem("patientSummary"))
		)
		console.log(JSON.parse(window.sessionStorage.getItem("patientSummary")))
	}, [])

	return (
		<div className="flex grow w-full">
			<div className="flex flex-col grow items-center bg-base-100">
				<button className="flex justify-start items-center mt-2 h-11 w-11/12 rounded hover:bg-gray-300">
					<PersonIcon className="w-1/6" />
					<article className="">Patient Summary</article>
				</button>
				<button className="flex justify-start items-center mt-2 h-11 w-11/12 rounded hover:bg-gray-300">
					<MonitorHeartIcon className="w-1/6" />
					<article>Mortality</article>
				</button>
				<button className="flex justify-start items-center mt-2 h-11 w-11/12 rounded hover:bg-gray-300">
					<CalendarMonthIcon className="w-1/6" />
					<article>Length of Stay</article>
				</button>
				<button className="flex justify-start items-center mt-2 h-11 w-11/12 rounded hover:bg-gray-300">
					<LoopIcon className="w-1/6" />
					<article>Unplanned Readmission</article>
				</button>
				<button className="flex justify-start items-center mt-2 h-11 w-11/12 rounded hover:bg-gray-300">
					<HealthAndSafetyIcon className="w-1/6" />
					<article>ICU Admission</article>
				</button>
			</div>
			<div className="flex flex-col w-4/5 items-center justify-center">
				<div className="flex flex-col w-11/12 h-[90%] bg-white rounded">
					<div>
						<div>ID: {patientData.id}</div>
						<div>Name: {patientData.id}</div>
						<div>Gender: {patientData.id}</div>
						<div>Date of Birth: {patientData.id}</div>
						<div>Phone Number: {patientData.id}</div>
						<div>Address: {patientData.id}</div>
						<div>Allergies: {patientData.id}</div>
					</div>
					<div>Medication History</div>
				</div>
			</div>
			{/* <PatientDetails patientData={patientData} /> */}
		</div>
	)
}

export default PatientSummary
