import { ThemeProvider, createTheme } from "@mui/material"
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
		<ThemeProvider theme={theme}>
			<div data-theme="corporate">
				<Component {...pageProps} />
			</div>
		</ThemeProvider>
	)
}
