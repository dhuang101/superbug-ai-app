import { medAdInput } from "../types/ValidationTypes"

export function ValidatePatientObj(obj: medAdInput) {
	let validatedObj

	if !(obj.hasOwnProperty("entry")){
		return []
	}
	
	return validatedObj
}
