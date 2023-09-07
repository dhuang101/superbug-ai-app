import axios from "axios"

// find all locations (wings/wards?)
// for each location fetch related encounters
// for each encounter fetch diagnostic reports
// check that the report is issued within date range

// return object
// key: location value: number of diagnostic reports

async function getGroupedLocaCount(apiUrl: string, start: Date, end: Date) {
	// grab all locations in database
	let locations
	await axios
		.get(`${apiUrl}Location`, {
			params: { start: start, end: end },
		})
		.then((res) => {
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
		return location.resource.physicalType.coding[0].code === "wa"
	})

	// fetch all encounters related to the filtered locations
	let encounters = []
	let currentResponse
	return await Promise.all(
		locations.map(async (location) => {
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
					currentResponse = result
				})
			}
			// only push entries if they exist
			if (currentResponse.hasOwnProperty("entry")) {
				encounters = encounters.concat(currentResponse.entry)
			}

			// now fetch diagnostic reports for the encounters related to the locations
			let diagnosticReports = []
			encounters.forEach(async (encounter) => {
				await axios
					.get(`${apiUrl}DiagnosticReport`, {
						params: { encounter: encounter.resource.id },
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
						currentResponse = result
					})
				}
			})
			// only push entries if they exist
			if (currentResponse.hasOwnProperty("entry")) {
				diagnosticReports = diagnosticReports.concat(
					currentResponse.entry
				)
			}
			// create return value map
			return {
				name: location.resource.name,
				count: diagnosticReports.length,
			}
		})
	)
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
