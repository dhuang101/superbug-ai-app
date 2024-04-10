import axios from "axios"

function getRaByPatient(apiUrl: string, patientId: string) {
	const apiCall: any = axios
		.get(`${apiUrl}RiskAssessment`, {
			params: { patient: patientId },
			headers: { authentication: process.env.HAPI_FHIR_AUTH },
		})
		.then((res) => {
			if (res.data.hasOwnProperty("entry")) {
				return res.data.entry
			} else {
				return []
			}
		})
	return apiCall
}

// handler for any calls to this endpoint
export default async function handler(req, res) {
	const params = req.query

	try {
		const result = await getRaByPatient(params.apiUrl, params.patientId)
		res.status(200).json(result)
	} catch (err) {
		res.status(500).json(err)
	}
}
