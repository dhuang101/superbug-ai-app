import { ChangeEvent, useState, useContext } from "react"
import ApiContext from "../contexts/ApiContext"

// page which will allow the user to set the api url used
function FhirApi() {
	// global state container
	const apiContext = useContext(ApiContext)
	const [currentInput, setCurrentInput] = useState("")

	function handleInput(event: ChangeEvent<HTMLInputElement>): void {
		setCurrentInput(event.target.value)
	}

	function handleSubmit(): void {
		if (currentInput === "") {
			const input = document.getElementById(
				"errors"
			) as HTMLElement | null
			if (input !== null) {
				input.innerHTML = "Enter an API URL"
			}
			// throw error
			return
		} else if (currentInput[currentInput.length - 1] !== "/") {
			const input = document.getElementById(
				"errors"
			) as HTMLElement | null
			if (input !== null) {
				input.innerHTML = "Error: Trailing forward slash required"
			}
			// throw error
			return
		}
		apiContext.setter(currentInput)
		window.localStorage.setItem("currentApiUrl", currentInput)
	}

	return (
		<div className="flex flex-col grow justify-center items-center w-3/5">
			<article className="text-3xl font-semibold text-center">
				Adjust FHIR API
			</article>
			<div className="flex flex-row justify-center pt-3 w-full">
				<input
					type="text"
					placeholder="https://"
					className="input input-bordered w-full max-w-sm"
					onChange={handleInput}
				/>
				<button
					className="ml-2 btn rounded btn-primary"
					onClick={handleSubmit}
				>
					Submit
				</button>
			</div>

			<article className="mt-6">
				Current API: <b className="font-semibold">{apiContext.value}</b>
			</article>
			<article
				id="errors"
				className="pt-12 text-xl text-red-600 min-h-[76px]"
			></article>
		</div>
	)
}

export default FhirApi
