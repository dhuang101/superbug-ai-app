import axios from "axios"

export function getPatientsByName(
	apiUrl: string,
	name: string,
	currentPage: number,
	rowCount: number
) {
	const apiCall: Promise<any> = axios
		.get(`${apiUrl}Patient`, {
			params: {
				_sort: "_id",
				_getpagesoffset: currentPage * 10,
				_count: rowCount,
				name: name,
			},
		})
		.then((res) => {
			console.log(res)
			if (res.data.hasOwnProperty("entry")) {
				return res.data.entry
			} else {
				return []
			}
		})
		.catch((error) => {
			console.log(error)
		})

	return apiCall
}

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
				_getpagesoffset: currentPage * 10,
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
		.catch((error) => {
			console.log(error)
		})

	return apiCall
}

export function baseApiCall(apiUrl: string) {
	const apiCall: Promise<any> = axios
		.get(apiUrl)
		.then((res) => {
			return res
		})
		.catch((error) => {
			console.log(error)
		})

	return apiCall
}
