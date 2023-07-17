import { medAdValidated } from "../types/ValidationTypes"

export function ValidateMedReq(list: {
	hasOwnProperty: (arg0: string) => any
	entry: {
		resource: {
			id: string
			hasOwnProperty: (arg0: string) => any
			medicationCodeableConcept: { text: string }
			status: string
		}
	}[]
}): React.SetStateAction<medAdValidated[]> {
	let validatedList: medAdValidated[] = []

	// check if any entries are returned
	if (!list.hasOwnProperty("entry")) {
		return validatedList
	} else {
		list.entry.forEach(
			(obj: {
				resource: {
					id: string
					hasOwnProperty: (arg0: string) => any
					medicationCodeableConcept: { text: string }
					status: string
				}
			}) => {
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
					validatedObj.name =
						obj.resource.medicationCodeableConcept.text
				}
				// Status
				if (obj.resource.hasOwnProperty("status")) {
					validatedObj.status =
						obj.resource.status[0].toUpperCase() +
						obj.resource.status.substring(1)
				}

				// push new obj to the list
				validatedList.push(validatedObj)
			}
		)
	}

	return validatedList
}
