import Link from "next/link"
import { useRouter } from "next/router"
import React, { useEffect } from "react"

const _defaultGetTextGenerator = (param, query) => null
const _defaultGetDefaultTextGenerator = (path, idx) => {
	path = path.split("/").slice(1)[idx]
	path = path.split(/(?=[A-Z])/).join(" ")
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
				// Pull out and convert "[post_id]" into "post_id"
				const param = pathnameNestedRoutes[idx]
					.replace("[", "")
					.replace("]", "")
				const href =
					"/" + asPathNestedRoutes.slice(0, idx + 1).join("/")

				return {
					href,
					textGenerator: getTextGenerator(param, router.query),
					text: getDefaultTextGenerator(href, idx),
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
		<div className="flex breadcrumbs mt-2">
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
