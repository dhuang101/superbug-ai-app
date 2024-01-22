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
	theme?: String
}

// https://fhirdb-monash.fhir-web-apps.cloud.edu.au/fhir/ for web server vm
const initialState: State = {
	apiUrl: "http://localhost:8080/fhir/",
	theme: null,
}

function StoreReducer(state, action) {
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
	const [state, dispatch] = useReducer(StoreReducer, initialState)

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
