import axios from "axios"

export function getResourceCount(apiUrl: string) {
	const apiCall: Promise<any> = axios
		.get(`${apiUrl}$get-resource-counts`)
		.then((res) => {
			return res.data.parameter
		})
		.catch((error) => {
			console.log(error)
		})

	return apiCall
}
