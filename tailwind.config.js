/** @type {import('tailwindcss').Config} */

module.exports = {
	content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
	plugins: [require("daisyui")],
	daisyui: {
		themes: ["business", "corporate"],
	},
}

// 		{
// 			lightMode: {
// 				primary: "#4b6bfb",
// 				"primary-focus": "#284FFB",
// 				"primary-content": "#E2E0FF",
// 				secondary: "#7b92b2",
// 				"secondary-focus": "#657FA4",
// 				"secondary-content": "#1D2025",
// 				accent: "#67cba0",
// 				"accent-focus": "#4CC28F",
// 				"accent-content": "#1A2821",
// 				neutral: "#181a2a",
// 				"neutral-focus": "#EDEDED",
// 				"neutral-content": "#EDF2F7",
// 				"base-100": "#ffffff",
// 				"base-200": "#EDEDED",
// 				"base-300": "#DBDBDB",
// 				"base-content": "#181A2A",
// 				info: "#3abff8",
// 				"info-content": "#002B3D",
// 				success: "#36d399",
// 				"success-content": "#003320",
// 				warning: "#fbbd23",
// 				"warning-content": "#382800",
// 				error: "#f87272",
// 				"error-content": "#470000",
// 			},
// 			darkMode: {
// 				primary: "#1eb854",
// 				secondary: "#1db990",
// 				accent: "#1db9ac",
// 				neutral: "#18342b",
// 				"base-100": "#171212",
// 				info: "#3abff8",
// 				success: "#36d399",
// 				warning: "#fbbd23",
// 				error: "#f87272",
// 			},
// 		},
