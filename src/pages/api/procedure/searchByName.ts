import axios from "axios"

function searchByName(apiUrl: string, name: string) {
	const apiCall: any = axios
		.get(`${apiUrl}Procedure`, {
			params: { "code:text": name, _count: 100 },
		})
		.then((res) => {
			if (res.hasOwnProperty("data")) {
				return res.data
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
		let result = await searchByName(params.apiUrl, params.name)
		res.status(200).json(result)
	} catch (err) {
		res.status(500).json(err)
	}
}
