import PatientSearch from "./PatientSearch"

// functionally just a wrapper that allows the / path to lead to the patient list
function Home() {
	return <PatientSearch />
}

export default Home
