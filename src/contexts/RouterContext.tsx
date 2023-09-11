import { createContext } from "react"

interface AppContextInterface {
	value: any
	setter: React.Dispatch<React.SetStateAction<any>>
}

// context for passing data between pages without being visible as query params

const RouterContext = createContext<AppContextInterface | null>(null)

export default RouterContext
