import { ThemeProvider, createTheme } from "@mui/material"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import "../styles/globals.css"
import { useState, useEffect } from "react"
import ApiContext from "../contexts/ApiContext"
import NavBar from "../components/NavBar"

export default function MyApp({ Component, pageProps }) {
	// global state wrapper for the api url
	const [apiUrl, setApiUrl] = useState("http://localhost:8080/fhir/")
	const contextWrapper = { value: apiUrl, setter: setApiUrl }

	useEffect(() => {
		let currentApiUrl = window.localStorage.getItem("currentApiUrl")
		if (currentApiUrl !== null) {
			setApiUrl(currentApiUrl)
		}
	}, [])

	// global theme
	const theme = createTheme({
		typography: {
			fontFamily: [
				"ui-sans-serif",
				"system-ui",
				"-apple-system",
				"BlinkMacSystemFont",
				"Segoe UI",
				"Roboto",
				"Helvetica Neue",
				"Arial",
				"Noto Sans",
				"sans-serif",
				"Apple Color Emoji",
				"Segoe UI Emoji",
				"Segoe UI Symbol",
				"Noto Color Emoji",
			].join(","),
		},
	})

	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<ThemeProvider theme={theme}>
				<div data-theme="corporate">
					<ApiContext.Provider value={contextWrapper}>
						<div className="flex flex-col h-screen min-w-screen">
							<NavBar />
							<div className="flex flex-col h-[93%] overflow-auto w-full items-center bg-gray-200">
								<Component {...pageProps} />
							</div>
						</div>
					</ApiContext.Provider>
				</div>
			</ThemeProvider>
		</LocalizationProvider>
	)
}
