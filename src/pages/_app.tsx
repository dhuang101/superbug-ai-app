import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { SessionProvider } from "next-auth/react"
import "../styles/globals.css"
import React, { useState, useEffect } from "react"
import ApiContext from "../contexts/ApiContext"
import NavBar from "../components/NavBar"

// https://fhirdb-monash.fhir-web-apps.cloud.edu.au/fhir/ for web server vm
export default function MyApp({
	Component,
	pageProps: { session, ...pageProps },
}) {
	// global state wrapper for the api url
	const [apiUrl, setApiUrl] = useState("http://localhost:8080/fhir/")
	const apiContextWrapper = { value: apiUrl, setter: setApiUrl }

	// state for the theme
	const [theme, setTheme] = useState(null)

	useEffect(() => {
		// reload api url from local storage if previously set
		let currentApiUrl = window.localStorage.getItem("currentApiUrl")
		if (currentApiUrl !== null) {
			setApiUrl(currentApiUrl)
		}

		// reload the theme from local storage if previously set
		let currentTheme = window.localStorage.getItem("theme")
		if (currentTheme !== null) {
			setTheme(currentTheme)
		} else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
			setTheme("darkMode")
			window.localStorage.setItem("theme", "darkMode")
		} else {
			setTheme("lightMode")
			window.localStorage.setItem("theme", "lightMode")
		}
	}, [])

	return theme === null ? (
		<div className="min-h-screen min-w-screen bg-slate-400" />
	) : (
		<SessionProvider session={session}>
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<div data-theme={theme} className="font-sans" id="themeWrapper">
					<ApiContext.Provider value={apiContextWrapper}>
						<div className="flex flex-col h-screen min-w-screen">
							<NavBar theme={theme} setTheme={setTheme} />
							<div className="flex flex-col h-[93%] overflow-auto w-full items-center bg-base-200">
								<Component {...pageProps} />
							</div>
						</div>
					</ApiContext.Provider>
				</div>
			</LocalizationProvider>
		</SessionProvider>
	)
}
