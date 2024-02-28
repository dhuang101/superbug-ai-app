import axios from "axios"

// define the axios call to the FHIR server
function getPatientsByName(
	apiUrl: string,
	name: string,
	currentPage: number,
	rowCount: number
) {
	const apiCall: Promise<any> = axios
		.get(`${apiUrl}Patient`, {
			params: {
				_sort: "name",
				_getpagesoffset: currentPage * rowCount,
				_count: rowCount,
				name: name,
			},
			headers: { authentication: "someuser:thepassword" },
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
		const result = await getPatientsByName(
			params.apiUrl,
			params.name,
			params.currentPage,
			params.rowsPerPage
		)

		res.status(200).json(result)
	} catch (err) {
		res.status(500).json(err)
	}
}
