import Link from "next/link"
import { useRouter } from "next/router"
import React, { useEffect } from "react"

// function that parses a string a capitalises each word
function capitalizeEachWord(str) {
	str = decodeURIComponent(str)
	return str.replace(/\w\S*/g, function (txt) {
		return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
	})
}

// no default text at the moment
const defaultTextGenerator = (param, query) => null
// function that formats each portion of the breadcrumbs
const textFormatter = (path, idx, idFlag) => {
	// grab the current crumb
	path = path.split("/").slice(1)[idx]
	// do not remove "-" when it is an id
	if (!idFlag) {
		path = path.replace(/-/g, " ")
	}
	// capitalise words
	path = capitalizeEachWord(path)
	path = decodeURIComponent(path)
	return path
}

// grabs the parts
const generatePathParts = (pathStr) => {
	const pathWithoutQuery = pathStr.split("?")[0]
	return pathWithoutQuery.split("/").filter((v) => v.length > 0)
}

function Breadcrumbs({
	getDefaultText = defaultTextGenerator,
	getFormattedText = textFormatter,
}) {
	const router = useRouter()

	const breadcrumbs = React.useMemo(
		function generateBreadcrumbs() {
			const asPathNestedRoutes = generatePathParts(router.asPath)
			const pathnameNestedRoutes = generatePathParts(router.pathname)

			const crumblist = asPathNestedRoutes.map((subpath, idx) => {
				let idFlag = false
				if (pathnameNestedRoutes[idx] === "[id]") {
					idFlag = true
				}
				// Pull out and convert "[post_id]" into "post_id"
				const param = pathnameNestedRoutes[idx]
					.replace("[", "")
					.replace("]", "")
				const href =
					"/" + asPathNestedRoutes.slice(0, idx + 1).join("/")

				return {
					href,
					textGenerator: getDefaultText(param, router.query),
					text: getFormattedText(href, idx, idFlag),
				}
			})
			// returns with a pregenerated crumb for home
			return [{ href: "/", text: "Home" }, ...crumblist]
		},
		[
			router.asPath,
			router.pathname,
			router.query,
			getDefaultText,
			getFormattedText,
		]
	)

	return breadcrumbs.length > 1 ? (
		<div className="flex breadcrumbs mt-2 min-h-[40px]">
			<ul>
				{breadcrumbs.map((crumb, idx) => (
					<Crumb
						{...crumb}
						key={idx}
						last={idx === breadcrumbs.length - 1}
					/>
				))}
			</ul>
		</div>
	) : null
}

function Crumb({ text: defaultText, textGenerator, href, last = false }) {
	const [text, setText] = React.useState(defaultText)

	useEffect(() => {
		if (!Boolean(textGenerator)) return setText(defaultText)

		async function fetchData() {
			const currText = await textGenerator()
			setText(currText)
		}

		fetchData()
	}, [defaultText, textGenerator])

	if (last) {
		return <li>{text}</li>
	}

	return (
		<li>
			<Link color="inherit" href={href}>
				{text}
			</Link>
		</li>
	)
}

export default Breadcrumbs
