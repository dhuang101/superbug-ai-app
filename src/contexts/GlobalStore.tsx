import { createContext, useReducer } from "react"

export enum ACTION {
	UPDATE_API,
	UPDATE_THEME,
}

export interface Action {
	type: ACTION
	payload: any
}

export interface State {
	apiUrl: String
	theme: String | null
	countData: {
		summaryData: any
		startDate?: string
		endDate?: string
	} | null
}

// https://fhirdb-monash.fhir-web-apps.cloud.edu.au/fhir/ for Nectar server vm
// http://10.172.235.4:8080/fhir/ for Alfred infra
const initialState: State = {
	apiUrl: "http://10.172.235.4:8080/fhir/",
	theme: null,
	countData: null,
}

function storeReducer(state, action) {
	switch (action.type) {
		case ACTION.UPDATE_API:
			return {
				...state,
				apiUrl: action.payload,
			}
		case ACTION.UPDATE_THEME:
			return {
				...state,
				theme: action.payload,
			}
		default:
			return state
	}
}

function GlobalStore({ children }: React.PropsWithChildren): JSX.Element {
	const [state, dispatch] = useReducer(storeReducer, initialState)

	return (
		<GlobalContext.Provider value={[state, dispatch]}>
			{children}
		</GlobalContext.Provider>
	)
}

export const GlobalContext = createContext<[State, React.Dispatch<Action>]>([
	initialState,
	() => {},
])

export default GlobalStore
