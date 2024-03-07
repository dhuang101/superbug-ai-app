import axios from "axios"

async function getGroupedDiagCount(apiUrl: string, start: Date, end: Date) {
	// parsing arguments
	let urlExtension: string
	if (typeof start === "undefined" && typeof end === "undefined") {
		urlExtension = `?_count=100`
	} else {
		urlExtension = `?issued=ge${start}&issued=le${end}&_count=100`
	}
	// first call
	let allReports: { link: any[]; entry: any[] }
	let exitFlag = false
	await axios
		.get(`${apiUrl}DiagnosticReport${urlExtension}`, {
			headers: { authentication: process.env.HAPI_FHIR_AUTH },
		})
		.then((res) => {
			if (res.data.hasOwnProperty("entry")) {
				allReports = res.data
			} else {
				exitFlag = true
			}
		})

	// early exit for no data returned
	if (exitFlag) {
		return []
	}

	// recursive call
	let nextLink: string
	while (
		// checks whether a link to the next page exists
		allReports.link.some((link) => {
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
				result.data.entry = result.data.entry.concat(allReports.entry)
				allReports = result.data
			})
	}
	// aggregated count
	let countMap = {}
	allReports.entry.forEach((report) => {
		if (
			countMap.hasOwnProperty(
				report.resource.conclusionCode[0].coding[0].display
			)
		) {
			countMap[
				report.resource.conclusionCode[0].coding[0].display
			].count += 1
		} else {
			countMap[report.resource.conclusionCode[0].coding[0].display] = {
				code: report.resource.conclusionCode[0].coding[0].code,
				count: 1,
			}
		}
	})

	// convert to list data type
	let returnValue = []
	Object.keys(countMap).forEach((key) => {
		returnValue.push({
			name: key,
			code: countMap[key].code,
			count: countMap[key].count,
		})
	})
	return returnValue
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
