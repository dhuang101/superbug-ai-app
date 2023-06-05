import { useState, useEffect, useContext } from "react"
import { useRouter } from "next/router"
import { CircularProgress } from "@mui/material"
import { getPatientById } from "../../services/PatientSearch"
import ApiContext from "../../contexts/ApiContext"
import PersonIcon from "@mui/icons-material/Person"
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart"
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"
import LoopIcon from "@mui/icons-material/Loop"
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety"
import PatientDetails from "../../components/PatientSummary/PatientDetails"
import React from "react"
import { getAllergyById } from "../../services/PatientSummary"

function PatientSummary() {
	const { asPath } = useRouter()
	const apiContext = useContext(ApiContext)

	const [patientData, setPatientData] = useState<validatedObject>({
		id: "",
		name: "",
		gender: "",
		birthDate: "",
		phoneNum: "",
		lastUpdated: "",
		address: "",
	})
	const [allergyData, setAllergyData] = useState({})
	const [loading, setLoading] = useState(true)

	function ValidateObject(obj: inputObject) {
		let validatedObj = {
			id: "",
			name: "",
			gender: "",
			birthDate: "",
			phoneNum: "",
			lastUpdated: "",
			address: "",
		}

		validatedObj.id = obj.id

		if (obj.hasOwnProperty("name")) {
			validatedObj.name = obj.name[0].given[0] + " " + obj.name[0].family
		} else {
			validatedObj.name = "Not Given"
		}

		if (obj.hasOwnProperty("gender")) {
			validatedObj.gender =
				obj.gender[0].toUpperCase() + obj.gender.substring(1)
		} else {
			validatedObj.name = "Not Given"
		}

		if (obj.hasOwnProperty("birthDate")) {
			validatedObj.birthDate = new Date(obj.birthDate).toDateString()
		} else {
			validatedObj.birthDate = "Not Given"
		}

		if (obj.hasOwnProperty("telecom")) {
			validatedObj.phoneNum = obj.telecom[0].value
		} else {
			validatedObj.birthDate = "Not Given"
		}

		if (obj.hasOwnProperty("address")) {
			let addressList = obj.address[0]
			validatedObj.address =
				addressList.line[0] +
				", " +
				addressList.city +
				", " +
				addressList.state +
				", " +
				addressList.postalCode +
				", " +
				addressList.country
		} else {
			validatedObj.address = "No Value"
		}

		validatedObj.lastUpdated = new Date(obj.meta.lastUpdated).toDateString()

		return validatedObj
	}

	useEffect(() => {
		// this is used to fetch the id in the URL
		// for some reason useParams() returns null
		let id = asPath.split("/")[2]
		getPatientById(apiContext.value, id, 0, 1)
			.then((result: any) => {
				setPatientData(ValidateObject(result[0].resource))
			})
			.then(() => {
				getAllergyById(apiContext.value, id).then((result: any) => {
					console.log(result)
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
								<article className="mt-6 pl-16 text-xl">
									{patientData.id}
								</article>
								<PatientDetails patientData={patientData} />
							</div>
							<article className="mt-6 pl-16 text-xl">
								Allergies
							</article>
							<article className="mt-6 pl-16 text-xl">
								Medication History
							</article>
						</React.Fragment>
					)}
				</div>
			</div>
			{/* <PatientDetails patientData={patientData} /> */}
		</div>
	)
}

export default PatientSummary
