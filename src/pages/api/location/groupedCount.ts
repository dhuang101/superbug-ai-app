import axios from "axios"

// find all locations (wings/wards?)
// for each location fetch related encounters
// for each encounter fetch diagnostic reports
// check that the report is issued within date range

// return object
// key: location value: number of diagnostic reports

async function getGroupedLocaCount(apiUrl: string, start: Date, end: Date) {
	let locations
	await axios
		.get(`${apiUrl}Location`, {
			params: { start: start, end: end },
		})
		.then((res) => {
			if (res.hasOwnProperty("data")) {
				return res.data
			} else {
				return []
			}
		})
}

// handler for any calls to this endpoint
export default async function handler(req, res) {
	const params = req.query

	try {
		const result = await getGroupedLocaCount(
			params.apiUrl,
			params.start,
			params.end
		)

		res.status(200).json(result)
	} catch (err) {
		res.status(500).json(err)
	}
}
