import NavBar from "../components/NavBar"

// page which will allow the user to set the api url used
function FhirApi() {
	return (
		<div className="flex flex-col min-h-screen min-w-screen">
			<NavBar />
			<div className="flex justify-center pt-24 pb-52">
				<p id="errors" className="h-7 text-xl text-red-600"></p>
			</div>
		</div>
	)
}

export default FhirApi
