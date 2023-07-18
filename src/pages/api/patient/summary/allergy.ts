import axios from "axios"

function getAllergyById(apiUrl: string, id: any) {
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

	return apiCall
}

// handler for any calls to this endpoint
export default async function handler(req, res) {
	const params = req.query

	try {
		const result = await getAllergyById(params.apiUrl, params.id)
		res.status(200).json(result)
	} catch (err) {
		res.status(500).json(err)
	}
}
