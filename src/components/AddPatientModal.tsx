import { MenuItem, TextField } from "@mui/material"
import React, { ChangeEvent, FormEvent, useState } from "react"
import { DatePicker, DateValidationError } from "@mui/x-date-pickers"
import { PickerChangeHandlerContext } from "@mui/x-date-pickers/internals/hooks/usePicker/usePickerValue.types"
import { AddPatient } from "../services/AddPatient"

function AddPatientModal() {
	const [visible, setVisible] = useState(false)
	const [values, setValues] = useState({
		firstName: "",
		lastName: "",
		email: "",
		phoneNum: "",
		dateOfBirth: "",
		gender: "",
		address: "",
		city: "",
		state: "",
		zipCode: "",
		country: "",
	})

	function toggleVisible() {
		setVisible(!visible)
	}

	function handleInputChange(
		event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	): void {
		let key = event.target.id
		setValues((values) => ({
			...values,
			[event.target.id]: event.target.value,
		}))
	}

	function handleDobChange(
		value: DatePickerValues,
		context: PickerChangeHandlerContext<DateValidationError>
	): void {
		if (context.validationError === null) {
			setValues((values) => ({
				...values,
				dateOfBirth: value.$d.toISOString().substring(0, 10),
			}))
		}
	}

	function handleGenderChange(
		event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	): void {
		setValues((values) => ({
			...values,
			gender: event.target.value,
		}))
	}

	function handleSubmit(event: FormEvent<HTMLFormElement>): void {
		event.preventDefault()
		// marshall form input into required FHIR format
		let patientObj = {
			name: [
				{
					use: "official",
					family: values.lastName,
					given: [values.firstName],
				},
			],
			gender: values.gender.toLowerCase(),
			birthDate: values.dateOfBirth,
			resourceType: "Patient",
			email: values.email,
			address: [
				{
					use: "home",
					line: [values.address],
					city: values.city,
					state: values.state,
					postalCode: values.zipCode,
					country: values.country,
				},
			],
			telecom: [
				{
					system: "phone",
					value: values.phoneNum,
					use: "home",
				},
			],
		}
		console.log(patientObj)
		// call API to post
		AddPatient(patientObj).then((result) => {
			console.log(result)
		})
	}

	return (
		<React.Fragment>
			<button
				className="btn-sm rounded btn-primary ml-auto h-9 leading-9"
				onClick={toggleVisible}
			>
				Add Patient
			</button>

			{visible ? (
				<div
					className="fixed top-0 right-0 left-0 z-50 overflow-y-auto overflow-x-hidden
				inset-0 h-full items-center justify-center flex bg-gray-900 bg-opacity-50"
				>
					<div className="relative bg-white rounded-lg w-4/12 h-4/5 max-w-5xl">
						<form
							className="flex flex-col justify-between h-full p-4"
							onSubmit={handleSubmit}
						>
							<div className="flex justify-between">
								<h3 className="font-bold text-2xl">
									Add a New Patient
								</h3>
								<button
									className="btn-sm bg-red-500 hover:bg-red-700 text-white font-bold rounded"
									onClick={toggleVisible}
								>
									X
								</button>
							</div>
							<div className="flex justify-between">
								<TextField
									required
									onChange={handleInputChange}
									className="w-5/12"
									id="firstName"
									label="First Name"
									variant="outlined"
								/>
								<TextField
									required
									onChange={handleInputChange}
									id="lastName"
									className="w-5/12"
									label="Last Name"
									variant="outlined"
								/>
							</div>
							<TextField
								required
								onChange={handleInputChange}
								className="w-6/12"
								id="phoneNum"
								label="Phone Number"
								variant="outlined"
							/>
							<TextField
								required
								onChange={handleInputChange}
								className="w-9/12"
								type="email"
								id="email"
								label="Email"
								variant="outlined"
							/>

							<div className="flex justify-between">
								<DatePicker
									className="w-5/12"
									onChange={handleDobChange}
									openTo="year"
									format="DD/MM/YYYY"
									label="Date of Birth"
								/>
								<TextField
									required
									onChange={handleGenderChange}
									value={values.gender}
									className="w-5/12"
									select={true}
									id="gender"
									label="Gender"
									variant="outlined"
								>
									<MenuItem value={"Male"}>Male</MenuItem>
									<MenuItem value={"Female"}>Female</MenuItem>
									<MenuItem value={"Other"}>Other</MenuItem>
								</TextField>
							</div>
							<TextField
								required
								onChange={handleInputChange}
								id="address"
								label="Address"
								variant="outlined"
							/>
							<div className="flex justify-between">
								<TextField
									required
									onChange={handleInputChange}
									className="w-5/12"
									id="city"
									label="City"
									variant="outlined"
								/>
								<TextField
									required
									onChange={handleInputChange}
									className="w-5/12"
									id="state"
									label="State"
									variant="outlined"
								/>
							</div>
							<div className="flex justify-between">
								<TextField
									required
									onChange={handleInputChange}
									className="w-5/12"
									id="zipCode"
									label="ZIP Code"
									variant="outlined"
								/>
								<TextField
									required
									onChange={handleInputChange}
									className="w-5/12"
									id="country"
									label="Country"
									variant="outlined"
								/>
							</div>
							<button className="btn btn-primary">Submit</button>
						</form>
					</div>
				</div>
			) : (
				<div></div>
			)}
		</React.Fragment>
	)
}

export default AddPatientModal
