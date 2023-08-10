import Link from "next/link"

function NavBar() {
	return (
		<div className="navbar h-[7%] bg-slate-900">
			<div className="flex-1">
				<Link href={"/"}>
					<div className="btn btn-ghost normal-case text-xl text-white">
						Superbug AI
					</div>
				</Link>
			</div>
		</div>
	)
}

export default NavBar
