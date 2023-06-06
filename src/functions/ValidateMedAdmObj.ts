import { medAdInput } from "../types/ValidationTypes"

export function ValidateMedAdmObj(obj: medAdInput) {
	let validatedObj

	if (!obj.hasOwnProperty("entry")) {
		return []
	}

	return validatedObj
}
