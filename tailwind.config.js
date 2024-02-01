/** @type {import('tailwindcss').Config} */
// this function handles the opacity of color
function WithOpacityValue(variable) {
	return ({ opacityValue }) => {
		if (opacityValue === undefined) {
			return `oklch(var(${variable}))`
		}
		return `oklch(var(${variable}) / ${opacityValue})`
	}
}

module.exports = {
	content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
	plugins: [require("daisyui")],
	theme: {
		extend: {
			colors: {
				disabled: WithOpacityValue("disabled"),
			},
		},
	},
	daisyui: {
		themes: [
			{
				lightMode: {
					primary: "#4b6bfb",
					"primary-focus": "#284FFB",
					"primary-content": "#E2E0FF",
					secondary: "#7b92b2",
					"secondary-focus": "#657FA4",
					"secondary-content": "#1D2025",
					accent: "#67cba0",
					"accent-focus": "#4CC28F",
					"accent-content": "#1A2821",
					neutral: "#181a2a",
					"neutral-focus": "#EDEDED",
					"neutral-content": "#EDF2F7",
					"base-100": "#ffffff",
					"base-200": "#EDEDED",
					"base-300": "#DBDBDB",
					"base-content": "#181A2A",
					info: "#3abff8",
					"info-content": "#002B3D",
					success: "#36d372",
					"success-content": "#003320",
					warning: "#fbbd23",
					"warning-content": "#382800",
					error: "#f87272",
					"error-content": "#470000",
					disabled: "0 0% 69%",
				},
				darkMode: {
					primary: "#1c4f82",
					"primary-focus": "#163D64",
					"primary-content": "#D2D9E5",
					secondary: "#7d919b",
					"secondary-focus": "#6A808A",
					"secondary-content": "#1C1F21",
					accent: "#eb6b47",
					"accent-focus": "#E75127",
					"accent-content": "#2E1A14",
					neutral: "#23282f",
					"neutral-focus": "#14171A",
					"neutral-content": "#CDCED0",
					"base-100": "#212121",
					"base-200": "#1D1D1D",
					"base-300": "#000000",
					"base-content": "#CCCCCC",
					info: "#0092d6",
					"info-content": "#D9E8F7",
					success: "#6cb288",
					"success-content": "#1A231D",
					warning: "#daad58",
					"warning-content": "#2B2317",
					error: "#ab3d30",
					"error-content": "#F3D8D2",
					disabled: "0 0% 28%",
				},
			},
		],
	},
}
