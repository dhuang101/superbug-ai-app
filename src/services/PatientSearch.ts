import axios from "axios"
const baseUrl = "https://fhir.monash.edu/hapi-fhir-jpaserver/fhir"

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
				_getpagesoffset: currentPage,
				_count: rowCount,
				name: name,
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
				_getpagesoffset: currentPage,
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
