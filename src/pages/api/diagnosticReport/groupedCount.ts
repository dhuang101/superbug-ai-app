import axios from "axios"

function getGroupedDiagCount(apiUrl: string, start: Date, end: Date) {
	const apiCall: any = axios
		.get(`${apiUrl}DiagnosticReport/$groupedLocationsCount`, {
			params: { start: start, end: end },
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
		const result = await getGroupedDiagCount(
			params.apiUrl,
			params.start,
			params.end
		)

		res.status(200).json(result)
	} catch (err) {
		res.status(500).json(err)
	}
}
