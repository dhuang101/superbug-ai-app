import axios from "axios"

async function searchByCode(
	apiUrl: string,
	code: string,
	start: Date,
	end: Date
) {
	// get the first page with search params
	let returnValue: { link: any[]; entry: any }
	// check for date range
	let urlExtension = ""
	if (typeof start !== "undefined" && typeof end !== "undefined") {
		urlExtension = `?onset-date=ge${start}&onset-date=le${end}`
	}
	await axios
		.get(`${apiUrl}Condition${urlExtension}`, {
			params: { code: code, _count: 100 },
			headers: { authentication: process.env.HAPI_FHIR_AUTH },
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
		await axios
			.get(nextLink, {
				headers: { authentication: process.env.HAPI_FHIR_AUTH },
			})
			.then((result) => {
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
		let result = await searchByCode(
			params.apiUrl,
			params.code,
			params.start,
			params.end
		)
		res.status(200).json(result)
	} catch (err) {
		res.status(500).json(err)
	}
}
