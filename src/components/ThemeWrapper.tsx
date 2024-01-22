import { useContext, useEffect } from "react"
import { ACTION, GlobalContext } from "../contexts/GlobalStore"

function ThemeWrapper({ children }: React.PropsWithChildren): JSX.Element {
	// global state access
	const [globalState, dispatch] = useContext(GlobalContext)

	useEffect(() => {
		// reload api url from local storage if previously set
		let currentApiUrl = window.localStorage.getItem("currentApiUrl")
		if (currentApiUrl !== null) {
			dispatch({ type: ACTION.UPDATE_API, payload: currentApiUrl })
		}

		// reload the theme from local storage if previously set
		let currentTheme = window.localStorage.getItem("theme")
		if (currentTheme !== null) {
			dispatch({ type: ACTION.UPDATE_THEME, payload: currentTheme })
		} else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
			dispatch({ type: ACTION.UPDATE_THEME, payload: "darkMode" })
			window.localStorage.setItem("theme", "darkMode")
		} else {
			dispatch({ type: ACTION.UPDATE_THEME, payload: "lightMode" })
			window.localStorage.setItem("theme", "lightMode")
		}
	}, [])

	return globalState.theme === null ? (
		<div className="min-h-screen min-w-screen bg-slate-400" />
	) : (
		<div data-theme={globalState.theme}>{children}</div>
	)
}

export default ThemeWrapper
