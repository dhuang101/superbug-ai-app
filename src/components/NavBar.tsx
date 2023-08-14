import Link from "next/link"
import LightModeIcon from "@mui/icons-material/LightMode"
import DarkModeIcon from "@mui/icons-material/DarkMode"

function NavBar(props) {
	function ToggleTheme() {
		if (props.theme === "business") {
			props.setTheme("lightMode")
			window.localStorage.setItem("theme", "lightMode")
		} else {
			props.setTheme("business")
			window.localStorage.setItem("theme", "business")
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
		</div>
	)
}

export default NavBar
