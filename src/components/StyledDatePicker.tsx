import { ThemeProvider, createTheme } from "@mui/material/styles"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"

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
					},
				},
			},
			MuiInputBase: {
				styleOverrides: {
					root: {
						color: "hsl(var(--bc))",
					},
				},
			},
			MuiOutlinedInput: {
				styleOverrides: {
					root: {
						"& fieldset": {
							borderColor: "hsl(var(--p))",
						},
					},
				},
			},
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
