import { useSession, signOut } from "next-auth/react"
import Link from "next/link"
import PersonIcon from "@mui/icons-material/Person"
import LoginIcon from "@mui/icons-material/Login"
import LogoutIcon from "@mui/icons-material/Logout"
import LightModeIcon from "@mui/icons-material/LightMode"
import DarkModeIcon from "@mui/icons-material/DarkMode"
import { useContext } from "react"
import { ACTION, GlobalContext } from "../contexts/GlobalStore"

function NavBar() {
	// auth session
	const { data: session, status } = useSession()
	// global store access
	const [globalState, dispatch] = useContext(GlobalContext)

	function toggleTheme() {
		if (globalState.theme === "darkMode") {
			dispatch({ type: ACTION.UPDATE_THEME, payload: "lightMode" })
			window.localStorage.setItem("theme", "lightMode")
		} else {
			dispatch({ type: ACTION.UPDATE_THEME, payload: "darkMode" })
			window.localStorage.setItem("theme", "darkMode")
		}
	}

	return (
		<div className="navbar h-[7%] max-h-[64px] bg-primary">
			<div className="flex-1">
				<Link href={"/"}>
					<div className="btn btn-ghost normal-case rounded-xl text-xl text-primary-content">
						Superbug AI
					</div>
				</Link>
			</div>
			<div className="btn btn-ghost rounded-xl" onClick={toggleTheme}>
				{globalState.theme === "lightMode" ? (
					<LightModeIcon className="text-2xl text-primary-content" />
				) : (
					<DarkModeIcon className="text-2xl text-primary-content" />
				)}
			</div>
			{status === "authenticated" ? (
				<div className="ml-4 mr-6 dropdown dropdown-end text-primary-content">
					<label tabIndex={0} className="btn btn-ghost rounded-btn">
						<PersonIcon />
					</label>
					<ul
						tabIndex={0}
						className="menu dropdown-content z-[1] p-2 shadow rounded-box w-52 mt-4 bg-accent text-accent-content"
					>
						<article className="mx-2 my-2">
							Signed In As <b>{session.user.email}</b>
						</article>
						<li>
							<a
								onClick={() => {
									signOut()
								}}
							>
								<LogoutIcon />
								Sign Out
							</a>
						</li>
					</ul>
				</div>
			) : (
				<Link href={"/api/auth/signin"}>
					<div className="ml-4 mr-6 btn btn-ghost normal-case rounded-xl text-lg text-primary-content outline outline-1 outline-primary-content">
						<LoginIcon />
						Sign In
					</div>
				</Link>
			)}
		</div>
	)
}

export default NavBar
