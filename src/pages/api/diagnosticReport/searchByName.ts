import axios from "axios"

async function searchByName(apiUrl: string, name: string) {
	// get the first page with search params
	let returnValue: { link: any[]; entry: any }
	await axios
		.get(`${apiUrl}DiagnosticReport`, {
			params: { "conclusion:text": name, _count: 100 },
		})
		.then((res) => {
			if (res.hasOwnProperty("data")) {
				returnValue = res.data
			} else {
				return []
			}
		})
	// recursive get for next pages
	let nextLink: string
	while (
		// checks whether a link to the next page exists
		returnValue.link.some((link) => {
			// saves the url if it does
			if (link.relation === "next") {
				nextLink = link.url
			}
			return link.relation === "next"
		})
	) {
		// gets the next page and concats the results
		await axios.get(nextLink).then((result) => {
			result.data.entry = result.data.entry.concat(returnValue.entry)
			returnValue = result.data
		})
	}
	return returnValue
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