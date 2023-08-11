import { ThemeProvider, createTheme } from "@mui/material/styles"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import React from "react"

function StyledDatePicker(props) {
	const theme = createTheme({
		components: {
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
			// place holder text
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
			// selected day button
		},
	})

	return (
		<ThemeProvider theme={theme}>
			<DatePicker
				slotProps={{ textField: { size: "small" } }}
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
