import NavBar from "../../components/NavBar"

interface Props {
	// patientData is the object returned by the API
	patientData: any
}

function PatientSummary(patientData: Props) {
	return (
		<div className="flex flex-col min-h-screen min-w-screen items-center bg-gray-200">
			<NavBar />
			<div></div>
		</div>
	)
}

export default PatientSummary
