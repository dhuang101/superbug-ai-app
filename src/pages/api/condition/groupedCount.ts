import axios from "axios"

function getGroupedCondCount(apiUrl: string, start: Date, end: Date) {
	const apiCall: any = axios
		.get(`${apiUrl}Condition/$groupedConditionsCount`, {
			params: { start: start, end: end },
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
		const result = await getGroupedCondCount(
			params.apiUrl,
			params.start,
			params.end
		)

		res.status(200).json(result)
	} catch (err) {
		res.status(500).json(err)
	}
}
