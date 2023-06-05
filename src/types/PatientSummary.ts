interface inputObject {
	id: string
	hasOwnProperty: (arg0: string) => any
	name: { family: string; given: string[] }[]
	gender: string
	birthDate: string
	telecom: { value: string }[]
	address: any[]
	meta: { lastUpdated: string }
}

interface validatedObject {
	id: string
	name: string
	gender: string
	birthDate: string
	phoneNum: string
	lastUpdated: string
	address: string
}