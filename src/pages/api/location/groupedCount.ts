import axios from "axios"

// complex chain of api calls to retrieve all diagnostic reports related to a location
async function getGroupedLocaCount(apiUrl: string, start: Date, end: Date) {
	// init return value
	let returnValue = []

	// grab all locations in database
	let locations: any
	await axios.get(`${apiUrl}Location`).then((res) => {
		if (res.hasOwnProperty("data")) {
			locations = res.data
		} else {
			return []
		}
	})
	// recursive call
	let nextLink: string
	while (
		// checks whether a link to the next page exists
		locations.link.some((link: { relation: string; url: string }) => {
			// saves the url if it does
			if (link.relation === "next") {
				nextLink = link.url
			}
			return link.relation === "next"
		})
	) {
		// gets the next page and concats the results
		await axios.get(nextLink).then((result) => {
			result.data.entry = result.data.entry.concat(locations.entry)
			locations = result.data
		})
	}
	// filters for given physical type
	locations = locations.entry.filter((location) => {
		return location.resource.form.coding[0].code === "wa"
	})

	// fetch all encounters related to the filtered locations
	for (const location of locations) {
		// reset encounters for each location
		let encounters = []
		// variable to complete paginated reponse
		let currentResponse
		// fetch first page
		await axios
			.get(`${apiUrl}Encounter`, {
				params: { location: location.resource.id },
			})
			.then((res) => {
				currentResponse = res.data
			})
		// recursive call
		let nextLink: string
		while (
			// checks whether a link to the next page exists
			currentResponse.link.some(
				(link: { relation: string; url: string }) => {
					// saves the url if it does
					if (link.relation === "next") {
						nextLink = link.url
					}
					return link.relation === "next"
				}
			)
		) {
			// gets the next page and concats the results
			await axios.get(nextLink).then((result) => {
				result.data.entry = result.data.entry.concat(
					currentResponse.entry
				)
				currentResponse = result.data
			})
		}
		// only push entries if they exist
		if (currentResponse.hasOwnProperty("entry")) {
			encounters = encounters.concat(currentResponse.entry)
		}

		// finally fetch related diagnostic reports
		for (const encounter of encounters) {
			// reset diagnostic reports for each encounter
			let diagnosticReports = []
			// parsing arguments
			let urlExtension = "?_count=100"
			if (typeof start !== "undefined" && typeof end !== "undefined") {
				urlExtension = `?issued=ge${start}&issued=le${end}&_count=100`
			}
			// first call
			let exitFlag = false
			await axios
				.get(`${apiUrl}DiagnosticReport${urlExtension}`, {
					params: { encounter: encounter.resource.id },
				})
				.then((res) => {
					if (res.data.hasOwnProperty("entry")) {
						currentResponse = res.data
					} else {
						exitFlag = true
					}
				})

			// early exit for no data returned
			if (exitFlag) {
				break
			}

			let nextLink: string
			while (
				// checks whether a link to the next page exists
				currentResponse.link.some(
					(link: { relation: string; url: string }) => {
						// saves the url if it does
						if (link.relation === "next") {
							nextLink = link.url
						}
						return link.relation === "next"
					}
				)
			) {
				// gets the next page and concats the results
				await axios.get(nextLink).then((result) => {
					result.data.entry = result.data.entry.concat(
						currentResponse.entry
					)
					currentResponse = result.data
				})
			}
			// only adds to the list of reports if any entries are retrieved
			if (currentResponse.hasOwnProperty("entry")) {
				diagnosticReports = diagnosticReports.concat(
					currentResponse.entry
				)
			}
			// push data to the API return
			returnValue.push({
				name: location.resource.name,
				count: diagnosticReports.length,
				reports: diagnosticReports,
			})
		}
	}

	return returnValue
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
		console.log(err)
		res.status(500).json(err)
	}
}
