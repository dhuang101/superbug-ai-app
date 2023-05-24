import PatientList from "./PatientList"

// functionally just a wrapper that allows the / path to lead to the patient list
function Home() {
	return <PatientList />
}

export default Home
