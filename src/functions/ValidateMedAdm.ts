export function ValidateMedAdm(list) {
	let validatedList = []

	console.log(list)

	if (!list.hasOwnProperty("entry")) {
		return validatedList
	} else {
		list.entry.forEach((obj) => {
			let validatedObj = {}
		})
	}

	return validatedList
}
