import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { SessionProvider } from "next-auth/react"
import "../styles/globals.css"
import React from "react"
import NavBar from "../components/NavBar"
import GlobalStore from "../contexts/GlobalStore"
import StateLoader from "../components/StateLoader"

export default function App({
	Component,
	pageProps: { session, ...pageProps },
}) {
	return (
		<SessionProvider session={session}>
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<GlobalStore>
					<StateLoader>
						<div className="flex flex-col h-screen min-w-screen">
							<NavBar />
							<div className="flex flex-col flex-1 overflow-auto w-full items-center bg-base-200">
								<Component {...pageProps} />
							</div>
						</div>
					</StateLoader>
				</GlobalStore>
			</LocalizationProvider>
		</SessionProvider>
	)
}
