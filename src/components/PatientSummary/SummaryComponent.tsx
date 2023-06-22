import React, { useState, useEffect, useContext } from "react"
import { useRouter } from "next/router"
import { CircularProgress } from "@mui/material"
import { patientValidated } from "../../types/ValidationTypes"
import { getPatientById } from "../../services/PatientSearch"
import { ValidatePatientObj } from "../../functions/ValidatePatientObj"
import { getAllergyById, getMedReqById } from "../../services/PatientSummary"
import ApiContext from "../../contexts/ApiContext"
import PatientDetails from "./SubComponents/PatientDetails"
import MedicationHistory from "./SubComponents/MedicationHistory"
import AllergiesDetails from "./SubComponents/AllergiesDetails"

function SummaryComponent() {
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
	const [fetchedPat, setFetchedPat] = useState(false)
	const [fetchedMed, setFetchedMed] = useState(false)
	const [fetchedAl, setFetchedAl] = useState(false)

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
				setFetchedPat(true)
			})

		getMedReqById(apiContext.value, id)
			.then((result: any) => {
				setMedicationData(ValidateMedAdm(result.data))
			})
			.then(() => {
				setFetchedMed(true)
			})

		getAllergyById(apiContext.value, id)
			.then((result: any) => {
				setAllergyData(result)
			})
			.then(() => {
				setFetchedAl(true)
			})
	}, [])

	function ValidateMedAdm(list: any): React.SetStateAction<{}> {
		let validatedList = []

		// check if any entries are returned
		if (!list.hasOwnProperty("entry")) {
			return validatedList
		} else {
			list.entry.forEach((obj) => {
				// set base object
				let validatedObj = {
					id: "",
					name: "",
					category: "",
					status: "",
				}

				// ID
				validatedObj.id = obj.resource.id
				// Name
				if (obj.resource.hasOwnProperty("medicationCodeableConcept")) {
					validatedObj.name =
						obj.resource.medicationCodeableConcept.text
				}

				// push new obj to the list
				validatedList.push(validatedObj)
			})
		}

		return validatedList
	}

	return (
		<React.Fragment>
			{[fetchedPat, fetchedMed, fetchedAl].every(Boolean) ? (
				<React.Fragment>
					<div className="flex flex-col min-h-[250px]">
						<article className="mb-6 pl-16 text-xl font-semibold">
							{patientData.id}
						</article>
						<PatientDetails patientData={patientData} />
					</div>

					<div className="flex flex-col">
						<article className="my-6 pl-16 text-xl font-semibold">
							Medication History
						</article>
						<MedicationHistory medicationData={medicationData} />
					</div>
					<div className="flex flex-col">
						<article className="my-6 pl-16 text-xl font-semibold">
							Allergies
						</article>
						<AllergiesDetails allergyData={allergyData} />
					</div>
				</React.Fragment>
			) : (
				<div className="flex items-center justify-center h-full">
					<CircularProgress size={80} />
				</div>
			)}
		</React.Fragment>
	)
}

export default SummaryComponent
