import React, {
	ChangeEvent,
	KeyboardEvent,
	useEffect,
	useState,
	useContext,
} from "react"
import axios from "axios"
import ApiContext from "../../contexts/ApiContext"
import SearchTable from "../../components/SearchTable"
import { CircularProgress, TablePagination } from "@mui/material"
import { GetServerSideProps } from "next"

export const getServerSideProps: GetServerSideProps = async () => {
	return { props: { nothing: "nothing" } }
}

function PatientSearch() {
	// global state container
	const apiContext = useContext(ApiContext)
	// component specific state
	const [loading, setLoading] = useState(true)
	const [patientCount, setPatientCount] = useState(0)
	const [patientData, setPatientData] = useState([])
	const [searchInput, setSearchInput] = useState("")
	const [currentPage, setCurrentPage] = useState(0)
	const [rowsPerPage, setRowsPerPage] = useState(10)
	const [searchOption, setSearchOption] = useState("name")

	// use effect runs only once on component initialisation
	useEffect(() => {
		// fetches server meta data for display
		axios
			.get("/api/server/resourcecount", {
				params: {
					apiUrl: apiContext.value,
				},
			})
			.then((result: any) => {
				result.data.forEach((obj) => {
					if (obj.name === "Patient") {
						setPatientCount(obj.valueInteger)
					}
				})
			})
	}, [])

	// use effect controls which service is run based on the last search run
	// also handles the pages and row per page change
	useEffect(() => {
		// set loading flag
		setLoading(true)
		// fetches patients on mount
		// if forks to ensures the search function used is based on the last
		// used function
		if (searchOption === "id") {
			axios
				.get("/api/patient/search/id", {
					params: {
						apiUrl: apiContext.value,
						id: searchInput,
						currentPage: currentPage,
						rowsPerPage: rowsPerPage,
					},
				})
				.then((result: any) => {
					setPatientData(result.data)
				})
				.then(() => {
					setLoading(false)
				})
		} else if (searchOption === "name") {
			axios
				.get("/api/patient/search/name", {
					params: {
						apiUrl: apiContext.value,
						name: searchInput,
						currentPage: currentPage,
						rowsPerPage: rowsPerPage,
					},
				})
				.then((result: any) => {
					setPatientData(result.data)
				})
				.then(() => {
					setLoading(false)
				})
		}
	}, [currentPage, rowsPerPage])

	// function that handles input in the search box
	function handleInput(event: ChangeEvent<HTMLInputElement>) {
		setSearchInput(event.target.value)
	}

	function handleSelect(event: ChangeEvent<HTMLSelectElement>): void {
		setSearchOption(event.target.value)
	}

	function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
		if (event.key === "Enter") {
			handleSearch()
		}
	}

	// handles change of row count
	function handleChangeRowsPerPage(
		event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	): void {
		setCurrentPage(0)
		setRowsPerPage(parseInt(event.target.value)) // calls useEffect
	}

	// handles change of page
	function handleChangePage(
		event: React.MouseEvent<HTMLButtonElement>,
		page: number
	): void {
		setCurrentPage(page) // calls useEffect
		window.scrollTo(0, 0)
	}

	// starts the search
	function handleSearch() {
		// does not search when search bar is empty
		if (searchInput === "") {
			return
		}
		// sets loading flag
		setLoading(true)
		// checks if the serach bar is an id or a name
		if (searchOption === "id") {
			// searches for id
			axios
				.get("/api/patient/search/id", {
					params: {
						apiUrl: apiContext.value,
						id: searchInput,
						currentPage: 0,
						rowsPerPage: rowsPerPage,
					},
				})
				.then((result: any) => {
					setPatientData(result.data)
				})
				.then(() => {
					setCurrentPage(0)
					setLoading(false)
				})
		} else if (searchOption === "name") {
			// seraches for name
			axios
				.get("/api/patient/search/name", {
					params: {
						apiUrl: apiContext.value,
						name: searchInput,
						currentPage: 0,
						rowsPerPage: rowsPerPage,
					},
				})
				.then((result: any) => {
					setPatientData(result.data)
				})
				.then(() => {
					setCurrentPage(0)
					setLoading(false)
				})
		}
	}

	return (
		<div className="w-8/12 h-full">
			<div className="mt-6">
				<article className="text-3xl font-semibold">
					Patient List
				</article>
			</div>
			<div className="my-3">
				<select
					className="select select-bordered select-sm max-w-xs"
					onChange={handleSelect}
					value={searchOption}
				>
					<option value={"name"}>Search By Name</option>
					<option value={"id"}>Search By ID</option>
				</select>
			</div>
			<div className="flex flex-row">
				<input
					type="text"
					placeholder="Enter Query"
					className="input input-bordered w-full max-w-sm"
					onKeyDown={handleKeyDown}
					onChange={handleInput}
				/>
				<button
					className="ml-2 btn rounded btn-primary"
					disabled={loading}
					onClick={handleSearch}
				>
					Search
				</button>
			</div>
			{loading ? (
				<div className="flex items-center justify-center h-[68vh]">
					<CircularProgress size={80} />
				</div>
			) : patientData.length === 0 ? (
				<div className="flex items-center justify-center h-[68vh] text-3xl">
					No Results
				</div>
			) : (
				<React.Fragment>
					<div className="mt-2">
						<SearchTable patientData={patientData} />
					</div>
					<div className="flex items-center justify-center text-center mt-2">
						<TablePagination
							className="text-base-content"
							component="div"
							count={patientCount}
							page={currentPage}
							onPageChange={handleChangePage}
							rowsPerPage={rowsPerPage}
							onRowsPerPageChange={handleChangeRowsPerPage}
						/>
					</div>
				</React.Fragment>
			)}
		</div>
	)
}

export default PatientSearch
