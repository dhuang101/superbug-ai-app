import React from "react"
import { useState, useEffect, useContext } from "react"
import { useRouter } from "next/router"
import { CircularProgress } from "@mui/material"
import { patientValidated } from "../../types/ValidationTypes"
import { getPatientById } from "../../services/PatientSearch"
import { ValidatePatientObj } from "../../functions/ValidatePatientObj"
import { getAllergyById, getMedAdmById } from "../../services/PatientSummary"
import ApiContext from "../../contexts/ApiContext"
import PersonIcon from "@mui/icons-material/Person"
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart"
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"
import LoopIcon from "@mui/icons-material/Loop"
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety"
import PatientDetails from "../../components/PatientSummary/PatientDetails"
import MedicationHistory from "../../components/PatientSummary/MedicationHistory"
import AllergiesDetails from "../../components/PatientSummary/AllergiesDetails"

function PatientSummary() {
	// const for path param
	// for some reason useParams() returns null
	const { asPath } = useRouter()
	// global state container
	const apiContext = useContext(ApiContext)

	// component state values
	const [patientData, setPatientData] = useState<patientValidated>({
		id: "",
		name: "",
		gender: "",
		birthDate: "",
		phoneNum: "",
		lastUpdated: "",
		address: "",
	})
	const [allergyData, setAllergyData] = useState({})
	const [medicationData, setMedicationData] = useState({})
	const [loading, setLoading] = useState(true)

	// runs on component mount
	useEffect(() => {
		// splits the path to grab to id
		let id = asPath.split("/")[2]
		// chain of api calls to fetch required data
		getPatientById(apiContext.value, id, 0, 1)
			.then((result: any) => {
				setPatientData(ValidatePatientObj(result[0].resource))
			})
			.then(() => {
				getAllergyById(apiContext.value, id).then((result: any) => {
					return
				})
			})
			.then(() => {
				getMedAdmById(apiContext.value, id).then((result: any) => {
					setMedicationData(result.data.entry)
				})
			})
			.then(() => {
				setLoading(false)
			})
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
					{loading ? (
						<div className="flex items-center justify-center h-full">
							<CircularProgress size={80} />
						</div>
					) : (
						<React.Fragment>
							<div className="h-[35%]">
								<article className="my-6 pl-16 text-xl">
									{patientData.id}
								</article>
								<PatientDetails patientData={patientData} />
							</div>
							<div>
								<article className="my-6 pl-16 text-xl">
									Allergies
								</article>
								<AllergiesDetails allergyData={allergyData} />
							</div>
							<div>
								<article className="my-6 pl-16 text-xl">
									Medication History
								</article>
								<MedicationHistory
									medicationData={medicationData}
								/>
							</div>
						</React.Fragment>
					)}
				</div>
			</div>
			{/* <PatientDetails patientData={patientData} /> */}
		</div>
	)
}

export default PatientSummary
