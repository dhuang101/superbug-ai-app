import { ThemeProvider, createTheme } from "@mui/material"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import "../styles/globals.css"

export default function MyApp({ Component, pageProps }) {
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
					<Component {...pageProps} />
				</div>
			</ThemeProvider>
		</LocalizationProvider>
	)
}
