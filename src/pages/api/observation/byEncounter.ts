import axios from "axios"

function getObsForEnc(apiUrl: string, encId: string, code: string) {
	const apiCall: any = axios
		.get(`${apiUrl}Observation`, {
			params: { encounter: encId, "code:text": code, _sort: "date" },
			headers: { authentication: process.env.HAPI_FHIR_AUTH },
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
		const result = await getObsForEnc(
			params.apiUrl,
			params.encId,
			params.code
		)

		res.status(200).json(result)
	} catch (err) {
		res.status(500).json(err)
	}
}
