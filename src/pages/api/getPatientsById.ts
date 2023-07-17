import axios from "axios"

export function getPatientById(
	apiUrl: string,
	id: string,
	currentPage: number,
	rowCount: number
) {
	const apiCall: Promise<any> = axios
		.get(`${apiUrl}Patient`, {
			params: {
				_sort: "_id",
				_getpagesoffset: currentPage * rowCount,
				_count: rowCount,
				_id: id,
			},
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
		const result = await getPatientById(
			params.apiUrl,
			params.id,
			params.currentPage,
			params.rowsPerPage
		)

		res.status(200).json(result)
	} catch (err) {
		res.status(500).json(err)
	}
}
