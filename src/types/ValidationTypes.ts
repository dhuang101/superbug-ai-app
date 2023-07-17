export interface patientInput {
	id: string
	hasOwnProperty: (arg0: string) => any
	name: { family: string; given: string[] }[]
	gender: string
	birthDate: string
	telecom: { value: string }[]
	address: any[]
	meta: { lastUpdated: string }
}

export interface patientValidated {
	id: string
	name: string
	gender: string
	birthDate: string
	phoneNum: string
	lastUpdated: string
	address: string
}

export interface medAdInput {}

export interface medAdValidated {
	id: string
	name: string
	status: string
}
