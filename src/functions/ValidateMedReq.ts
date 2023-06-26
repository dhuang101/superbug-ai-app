export function ValidateMedReq(list: any): React.SetStateAction<{}> {
	let validatedList = []

	// check if any entries are returned
	if (!list.hasOwnProperty("entry")) {
		return validatedList
	} else {
		list.entry.forEach((obj) => {
			// set base object
			let validatedObj = {
				id: "",
				name: "",
				status: "",
			}

			// ID
			validatedObj.id = obj.resource.id
			// Name
			if (obj.resource.hasOwnProperty("medicationCodeableConcept")) {
				validatedObj.name = obj.resource.medicationCodeableConcept.text
			}
			// Status
			if (obj.resource.hasOwnProperty("status")) {
				validatedObj.status =
					obj.resource.status[0].toUpperCase() +
					obj.resource.status.substring(1)
			}

			// push new obj to the list
			validatedList.push(validatedObj)
		})
	}

	return validatedList
}