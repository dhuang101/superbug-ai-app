import Link from "next/link"
import LightModeIcon from "@mui/icons-material/LightMode"
import DarkModeIcon from "@mui/icons-material/DarkMode"

function NavBar() {
	return (
		<div className="navbar h-[7%] bg-primary">
			<div className="flex-1">
				<Link href={"/"}>
					<div className="btn btn-ghost normal-case text-xl text-primary-content">
						Superbug AI
					</div>
				</Link>
			</div>
			<div className="btn btn-ghost">
				<LightModeIcon className="text-2xl text-primary-content" />
			</div>
		</div>
	)
}

export default NavBar
