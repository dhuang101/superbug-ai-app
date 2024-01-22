import { createContext, useReducer } from "react"
import StoreReducer from "./StoreReducer"

export enum ACTION {
	UPDATE_API,
	TOGGLE_DARK,
}

export interface Action {
	TYPE: ACTION
	payload: any
}

export interface State {
	apiUrl: String
	darkMode: boolean
}

const initialState: State = {
	apiUrl: "http://localhost:8080/fhir/",
	darkMode: false,
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
