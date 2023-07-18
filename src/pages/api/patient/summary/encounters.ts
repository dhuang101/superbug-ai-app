import axios from "axios"

function getEncForPatient(
	apiUrl: string,
	patientId: string,
	className: string
) {
	const apiCall: any = axios
		.get(`${apiUrl}Encounter`, {
			params: { subject: patientId, class: className },
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
		const result = await getEncForPatient(
			params.apiUrl,
			params.patientId,
			params.className
		)
		res.status(200).json(result)
	} catch (err) {
		res.status(500).json(err)
	}
}
