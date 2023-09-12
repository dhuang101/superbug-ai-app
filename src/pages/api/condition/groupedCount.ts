import axios from "axios"

async function getGroupedCondCount(apiUrl: string, start: Date, end: Date) {
	// parsing arguments
	let urlExtension: string
	if (typeof start === "undefined" && typeof end === "undefined") {
		urlExtension = `?_count=100`
	} else {
		urlExtension = `?onset-date=ge${start}&onset-date=le${end}&_count=100`
	}

	// first call
	let allConditions: { link: any[]; entry: any[] }
	let exitFlag = false
	await axios.get(`${apiUrl}Condition${urlExtension}`).then((res) => {
		if (res.data.hasOwnProperty("entry")) {
			allConditions = res.data
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
		allConditions.link.some((link) => {
			// saves the url if it does
			if (link.relation === "next") {
				nextLink = link.url
			}
			return link.relation === "next"
		})
	) {
		// gets the next page and concats the results
		await axios.get(nextLink).then((result) => {
			result.data.entry = result.data.entry.concat(allConditions.entry)
			allConditions = result.data
		})
	}
	// aggregated count
	let countMap = {}
	allConditions.entry.forEach((condition) => {
		if (countMap.hasOwnProperty(condition.resource.code.text)) {
			countMap[condition.resource.code.text] += 1
		} else {
			countMap[condition.resource.code.text] = 1
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
