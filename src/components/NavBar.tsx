import { useSession, signOut } from "next-auth/react"
import Link from "next/link"
import PersonIcon from "@mui/icons-material/Person"
import LoginIcon from "@mui/icons-material/Login"
import LogoutIcon from "@mui/icons-material/Logout"
import LightModeIcon from "@mui/icons-material/LightMode"
import DarkModeIcon from "@mui/icons-material/DarkMode"

function NavBar(props: { theme: string; setTheme: (arg0: string) => void }) {
	const { data: session, status } = useSession()

	console.log(session)
	console.log(status)

	function ToggleTheme() {
		if (props.theme === "darkMode") {
			props.setTheme("lightMode")
			window.localStorage.setItem("theme", "lightMode")
		} else {
			props.setTheme("darkMode")
			window.localStorage.setItem("theme", "darkMode")
		}
	}

	return (
		<div className="navbar h-[7%] bg-primary">
			<div className="flex-1">
				<Link href={"/"}>
					<div className="btn btn-ghost normal-case rounded-xl text-xl text-primary-content">
						Superbug AI
					</div>
				</Link>
			</div>
			<div className="btn btn-ghost rounded-xl" onClick={ToggleTheme}>
				{props.theme === "lightMode" ? (
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
						className="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52 mt-4 text-primary"
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
