import axios from "axios"

export function getMedReqById(apiUrl: string, id: string) {
	const apiCall: Promise<any> = axios
		.get(`${apiUrl}MedicationRequest`, { params: { patient: id } })
		.then((res) => {
			return res.data
		})
		.catch((error) => {
			console.log(error)
		})

	return apiCall
}

export function getAllergyById(apiUrl: string, id: any) {
	const apiCall: Promise<any> = axios
		.get(`${apiUrl}AllergyIntolerance`, {
			params: {
				patient: id,
			},
		})
		.then((res) => {
			return []
			// return res.data.entry
		})
		.catch((error) => {
			console.log(error)
		})

	return apiCall
}

export function getEncForPatient(
	apiUrl: string,
	patientId: string,
	className: string
) {
	const result: any = axios
		.get(`${apiUrl}Encounter`, {
			params: { subject: patientId, class: className },
		})
		.then((res) => {
			if (res.data.hasOwnProperty("entry")) {
				return res.data.entry
			} else {
				return []
			}
		})
		.catch((error) => {
			console.log(error)
		})

	return result
}

export function getObsForEnc(apiUrl: string, encId: string, code: string) {
	const result: any = axios
		.get(`${apiUrl}Observation`, {
			params: { encounter: encId, "code:text": code, _sort: "date" },
		})
		.then((res) => {
			if (res.data.hasOwnProperty("entry")) {
				return res.data.entry
			} else {
				return []
			}
		})
		.catch((error) => {
			console.log(error)
		})

	return result
}
