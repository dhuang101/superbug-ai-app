import { ThemeProvider, createTheme } from "@mui/material"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import "../styles/globals.css"
import { useState } from "react"
import ApiContext from "../contexts/ApiContext"

export default function MyApp({ Component, pageProps }) {
	// global state wrapper for the api url
	const [apiUrl, setApiUrl] = useState("https://hapi.fhir.org/baseR4/")
	const contextWrapper = { value: apiUrl, setter: setApiUrl }

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
						<Component {...pageProps} />
					</ApiContext.Provider>
				</div>
			</ThemeProvider>
		</LocalizationProvider>
	)
}
