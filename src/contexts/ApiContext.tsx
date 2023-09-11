import { createContext } from "react"

interface AppContextInterface {
	value: string
	setter: React.Dispatch<React.SetStateAction<string>>
}

// context for allowing the api url to be accessible for all pages

const ApiContext = createContext<AppContextInterface | null>(null)

export default ApiContext
