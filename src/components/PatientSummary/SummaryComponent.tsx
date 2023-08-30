import React, { useState, useEffect, useContext } from "react"
import { useRouter } from "next/router"
import { CircularProgress } from "@mui/material"
import { medAdValidated, patientValidated } from "../../types/ValidationTypes"
import { ValidatePatientObj } from "../../functions/ValidatePatientObj"
import { ValidateMedReq } from "../../functions/ValidateMedReq"
import ApiContext from "../../contexts/ApiContext"
import PatientDetails from "./SubComponents/PatientDetails"
import MedicationHistory from "./SubComponents/MedicationHistory"
import AllergiesDetails from "./SubComponents/AllergiesDetails"
import axios from "axios"

function SummaryComponent() {
	// const for path param
	const router = useRouter()
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

	const [allergyData, setAllergyData] = useState([])
	const [medicationData, setMedicationData] = useState<medAdValidated[]>([])
	const [fetchedPat, setFetchedPat] = useState(false)
	const [fetchedMed, setFetchedMed] = useState(false)
	const [fetchedAl, setFetchedAl] = useState(false)

	// runs on component mount
	useEffect(() => {
		// splits the path to grab to id
		let id = router.query.id as string
		// chain of api calls to fetch required data
		axios
			.get("/api/patient/search/id", {
				params: {
					apiUrl: apiContext.value,
					id: id,
					currentPage: 0,
					rowsPerPage: 1,
				},
			})
			.then((result: any) => {
				if (result.data.length > 0) {
					setPatientData(ValidatePatientObj(result.data[0].resource))
				}
			})
			.then(() => {
				setFetchedPat(true)
			})

		axios
			.get("/api/patient/summary/medReq", {
				params: {
					apiUrl: apiContext.value,
					id: id,
				},
			})
			.then((result: any) => {
				setMedicationData(ValidateMedReq(result.data))
			})
			.then(() => {
				setFetchedMed(true)
			})

		axios
			.get("/api/patient/summary/allergy", {
				params: {
					apiUrl: apiContext.value,
					id: id,
				},
			})
			.then((result: any) => {
				setAllergyData(result.data)
			})
			.then(() => {
				setFetchedAl(true)
			})
	}, [])

	return (
		<React.Fragment>
			{[fetchedPat, fetchedMed, fetchedAl].every(Boolean) ? (
				<React.Fragment>
					<div className="flex flex-col min-h-[26vh] items-center">
						<article className="mb-6 text-xl font-semibold">
							{patientData.id}
						</article>
						<PatientDetails patientData={patientData} />
					</div>

					<div className="flex flex-col min-h-[26vh]">
						<article className="my-6 text-xl font-semibold">
							Medication History
						</article>
						<MedicationHistory medicationData={medicationData} />
					</div>
					<div className="flex flex-col min-h-[26vh]">
						<article className="my-6 text-xl font-semibold">
							Allergies
						</article>
						<AllergiesDetails allergyData={allergyData} />
					</div>
				</React.Fragment>
			) : (
				<div className="flex items-center justify-center h-[78vh]">
					<CircularProgress size={80} />
				</div>
			)}
		</React.Fragment>
	)
}

export default SummaryComponent
