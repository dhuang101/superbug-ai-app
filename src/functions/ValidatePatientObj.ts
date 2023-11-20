import { patientInput } from "../types/ValidationTypes"

export function ValidatePatientObj(obj: patientInput) {
	// preset object
	let validatedObj = {
		id: "",
		lastUpdated: "",
		name: "",
		gender: "",
		birthDate: "",
		phoneNum: "",
		address: "",
	}
	// sets metadata values
	validatedObj.id = obj.id
	validatedObj.lastUpdated = new Date(obj.meta.lastUpdated).toDateString()
	// validate other objects values
	if (obj.hasOwnProperty("name")) {
		validatedObj.name = obj.name[0].given[0] + " " + obj.name[0].family
	} else {
		validatedObj.name = "Not Given"
	}

	if (obj.hasOwnProperty("gender")) {
		validatedObj.gender =
			obj.gender[0].toUpperCase() + obj.gender.substring(1)
	} else {
		validatedObj.name = "Not Given"
	}

	if (obj.hasOwnProperty("birthDate")) {
		validatedObj.birthDate = new Date(obj.birthDate).toDateString()
	} else {
		validatedObj.birthDate = "Not Given"
	}

	if (obj.hasOwnProperty("telecom")) {
		validatedObj.phoneNum = obj.telecom[0].value
	} else {
		validatedObj.phoneNum = "Not Given"
	}

	if (obj.hasOwnProperty("address")) {
		let addressList = obj.address[0]
		validatedObj.address =
			addressList.line[0] +
			", " +
			addressList.city +
			", " +
			addressList.state +
			", " +
			addressList.postalCode +
			", " +
			addressList.country
	} else {
		validatedObj.address = "Not Given"
	}
	return validatedObj
}
