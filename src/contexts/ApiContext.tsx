import { createContext } from "react"

interface AppContextInterface {
	value: string
	setter: React.Dispatch<React.SetStateAction<string>>
}

const ApiContext = createContext<AppContextInterface | null>(null)

export default ApiContext
