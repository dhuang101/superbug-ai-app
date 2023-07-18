import axios from "axios"

function getResourceCount(apiUrl: string) {
	const apiCall: Promise<any> = axios
		.get(`${apiUrl}$get-resource-counts`)
		.then((res) => {
			return res.data.parameter
		})

	return apiCall
}

// handler for any calls to this endpoint
export default async function handler(req, res) {
	const params = req.query

	try {
		const result = await getResourceCount(params.apiUrl)
		res.status(200).json(result)
	} catch (err) {
		res.status(500).json(err)
	}
}
