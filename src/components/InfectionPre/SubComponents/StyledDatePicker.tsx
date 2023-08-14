// MUI custom styles doesn't contain full typescript support so we ignore
// @ts-nocheck

import React from "react"
import Popper from "@mui/material"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"

function StyledDatePicker(props) {
	const theme = createTheme({
		components: {
			// calendar icon
			MuiSvgIcon: {
				styleOverrides: {
					root: {
						color: "hsl(var(--bc))",
						"&:hover": {
							color: "hsl(var(--s))",
						},
					},
				},
			},
			// form label text
			MuiFormLabel: {
				styleOverrides: {
					root: {
						color: "hsl(var(--bc))",
						"&.Mui-focused": {
							color: "hsl(var(--pf))",
						},
						"&.Mui-error": {
							color: "hsl(var(--er))",
						},
					},
				},
			},
			// place holder date text
			MuiInputBase: {
				styleOverrides: {
					root: {
						color: "hsl(var(--bc))",
					},
				},
			},
			// text input outline
			MuiOutlinedInput: {
				styleOverrides: {
					root: {
						"& fieldset": {
							borderColor: "hsl(var(--p))",
						},
					},
				},
			},
			// background
			MuiPaper: {
				styleOverrides: {
					root: {
						backgroundColor: "hsl(var(--b2))",
						color: "hsl(var(--bc))",
					},
				},
			},
			// year picker button
			MuiPickersYear: {
				styleOverrides: {
					yearButton: {
						"&:hover": {
							backgroundColor: "hsl(var(--n))",
							color: "hsl(var(--nc))",
						},
						"&.Mui-selected": {
							backgroundColor: "hsl(var(--s))",
							color: "hsl(var(--sc))",
						},
						"&.Mui-selected:hover": {
							backgroundColor: "hsl(var(--sf))",
							color: "hsl(var(--sc))",
						},
						"&.Mui-selected:focus": {
							backgroundColor: "hsl(var(--s))",
							color: "hsl(var(--sc))",
						},
					},
				},
			},
			// day picker
			MuiPickersDay: {
				styleOverrides: {
					root: {
						color: "hsl(var(--bc))",
						"&:hover": {
							backgroundColor: "hsl(var(--n))",
							color: "hsl(var(--nc))",
						},
						"&.Mui-selected": {
							backgroundColor: "hsl(var(--s))",
							color: "hsl(var(--sc))",
						},
						"&.Mui-selected:hover": {
							backgroundColor: "hsl(var(--sf))",
							color: "hsl(var(--sc))",
						},
						"&.Mui-selected:focus": {
							backgroundColor: "hsl(var(--s))",
							color: "hsl(var(--sc))",
						},
						"&:not(.Mui-selected)": {
							borderColor: "hsl(var(--nc))",
						},
					},
				},
			},
			// day
			MuiDayCalendar: {
				styleOverrides: {
					weekDayLabel: { color: "hsl(var(--bc))" },
				},
			},
		},
	})

	// function that correctly places the popper in order to theme it
	function PopperWrap() {
		if (typeof document !== "undefined") {
			return document.getElementById("themeWrapper")
		} else {
			return document.body
		}
	}

	return (
		<ThemeProvider theme={theme}>
			<DatePicker
				slotProps={{
					textField: { size: "small" },
					popper: {
						container: PopperWrap,
					},
				}}
				onChange={props.onChange}
				openTo="year"
				format="DD/MM/YYYY"
				label={props.label}
				sx={{
					"& .MuiOutlinedInput-root": {
						"&:hover fieldset": {
							borderColor: "hsl(var(--s))",
						},
						"&.Mui-error fieldset": {
							borderColor: "hsl(var(--er))",
						},
						"&.Mui-focused fieldset": {
							borderColor: "hsl(var(--pf))",
						},
					},
				}}
			/>
		</ThemeProvider>
	)
}

export default StyledDatePicker
