import axios from "axios"
async function getGroupedDiagCount(apiUrl: string, start: Date, end: Date) {
	let urlExtension: string
	if (typeof start === "undefined" && typeof end === "undefined") {
		urlExtension = `?_count=100`
	} else {
		urlExtension = `?issued=ge${start}&issued=le${end}&_count=100`
	}
	console.log(`${apiUrl}DiagnosticReport${urlExtension}`)
	// first call
	let allReports: { link: any[]; entry: any[] }
	let exitFlag = false
	await axios.get(`${apiUrl}DiagnosticReport${urlExtension}`).then((res) => {
		if (res.data.total > 0) {
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
		await axios.get(nextLink).then((result) => {
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
			countMap[report.resource.conclusionCode[0].coding[0].display] += 1
		} else {
			countMap[report.resource.conclusionCode[0].coding[0].display] = 1
		}
	})

	// convert to list data type
	let returnValue = []
	Object.keys(countMap).forEach((key) => {
		returnValue.push({ name: key, count: countMap[key] })
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
