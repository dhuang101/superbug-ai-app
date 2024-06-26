import { KeyboardEvent, ChangeEvent, useState, useContext } from "react"
import { ACTION, GlobalContext } from "../contexts/GlobalStore"

// page which will allow the user to set the api url used
function FhirApi() {
	// global state container
	const [globalState, dispatch] = useContext(GlobalContext)
	const [currentInput, setCurrentInput] = useState("")

	function handleInput(event: ChangeEvent<HTMLInputElement>): void {
		setCurrentInput(event.target.value)
	}

	function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
		if (event.key === "Enter") {
			handleSubmit()
		}
	}

	function handleSubmit(): void {
		const error = document.getElementById("errors") as HTMLElement | null
		if (currentInput === "") {
			if (error !== null) {
				error.innerHTML = "Enter an API URL"
			}
			// throw error
			return
		} else if (currentInput[currentInput.length - 1] !== "/") {
			if (error !== null) {
				error.innerHTML = "Error: Trailing forward slash required"
			}
			// throw error
			return
		}
		error.innerHTML = ""
		dispatch({ type: ACTION.UPDATE_API, payload: currentInput })
		window.localStorage.setItem("currentApiUrl", currentInput)
	}

	return (
		<div className="flex flex-col h-full justify-center items-center w-3/5">
			<article className="text-3xl font-semibold text-center">
				Change FHIR API
			</article>
			<div className="flex flex-row justify-center mt-3 w-full">
				<input
					type="text"
					placeholder="https://"
					className="input input-bordered w-full max-w-sm"
					list="apiUrl"
					onKeyDown={handleKeyDown}
					onChange={handleInput}
				/>
				<datalist id="apiUrl">
					<option value="http://10.172.235.4:8080/fhir/" />
					<option value="https://fhirdb-monash.fhir-web-apps.cloud.edu.au/fhir/" />
					<option value="https://fhirdb-monash-secondary.fhir-web-apps.cloud.edu.au/fhir/" />
					<option value="http://localhost:8080/fhir/" />
				</datalist>
				<button
					className="ml-2 btn rounded btn-primary"
					onClick={handleSubmit}
				>
					Submit
				</button>
			</div>
			<article className="mt-6">
				Current API:{" "}
				<b className="font-semibold">{globalState.apiUrl}</b>
			</article>
			<article
				id="errors"
				className="pt-12 text-xl text-red-600 min-h-[76px]"
			></article>
		</div>
	)
}

export default FhirApi
