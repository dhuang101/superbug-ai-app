import axios from "axios"

function getMedReqById(apiUrl: string, id: string) {
	const apiCall: Promise<any> = axios
		.get(`${apiUrl}MedicationRequest`, { params: { patient: id } })
		.then((res) => {
			return res.data
		})

	return apiCall
}

// handler for any calls to this endpoint
export default async function handler(req, res) {
	const params = req.query

	try {
		const result = await getMedReqById(params.apiUrl, params.id)
		res.status(200).json(result)
	} catch (err) {
		res.status(500).json(err)
	}
}
