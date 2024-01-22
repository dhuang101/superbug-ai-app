import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { SessionProvider } from "next-auth/react"
import "../styles/globals.css"
import React from "react"
import NavBar from "../components/NavBar"
import GlobalStore from "../contexts/GlobalStore"
import ThemeWrapper from "../components/ThemeWrapper"

export default function App({
	Component,
	pageProps: { session, ...pageProps },
}) {
	return (
		<SessionProvider session={session}>
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<GlobalStore>
					<ThemeWrapper>
						<div className="flex flex-col h-screen min-w-screen">
							<NavBar />
							<div className="flex flex-col h-[93%] overflow-auto w-full items-center bg-base-200">
								<Component {...pageProps} />
							</div>
						</div>
					</ThemeWrapper>
				</GlobalStore>
			</LocalizationProvider>
		</SessionProvider>
	)
}
