import Link from "next/link"
import { useRouter } from "next/router"
import React, { useEffect } from "react"

function capitalizeEachWord(str) {
	str = decodeURIComponent(str)
	return str.replace(/\w\S*/g, function (txt) {
		return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
	})
}

const _defaultGetTextGenerator = (param, query) => null
const _defaultGetDefaultTextGenerator = (path, idx, idFlag) => {
	path = path.split("/").slice(1)[idx]
	if (!idFlag) {
		path = path.replace(/-/g, " ")
	}
	path = capitalizeEachWord(path)
	path = decodeURIComponent(path)
	return path
}

const generatePathParts = (pathStr) => {
	const pathWithoutQuery = pathStr.split("?")[0]
	return pathWithoutQuery.split("/").filter((v) => v.length > 0)
}

function Breadcrumbs({
	getTextGenerator = _defaultGetTextGenerator,
	getDefaultTextGenerator = _defaultGetDefaultTextGenerator,
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
					textGenerator: getTextGenerator(param, router.query),
					text: getDefaultTextGenerator(href, idx, idFlag),
				}
			})

			return [{ href: "/", text: "Home" }, ...crumblist]
		},
		[
			router.asPath,
			router.pathname,
			router.query,
			getTextGenerator,
			getDefaultTextGenerator,
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
