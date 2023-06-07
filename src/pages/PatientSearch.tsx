import React, { ChangeEvent, useEffect, useState, useContext } from "react"
import { getPatientById, getPatientsByName } from "../services/PatientSearch"
import ApiContext from "../contexts/ApiContext"
import SearchTable from "../components/SearchTable"
import { CircularProgress, TablePagination } from "@mui/material"

function PatientSearch() {
	// global state container
	const apiContext = useContext(ApiContext)
	// component specific state
	const [loading, setLoading] = useState(true)
	const [patientData, setPatientData] = useState([])
	const [searchInput, setSearchInput] = useState("")
	const [currentPage, setCurrentPage] = useState(0)
	const [rowsPerPage, setRowsPerPage] = useState(10)
	const [searchOption, setSearchOption] = useState("id")

	// use effect controls which service is run based on the last search run
	// also handles the pages and row per page change
	useEffect(() => {
		// set loading flag
		setLoading(true)
		// fetches patients on mount
		// if forks to ensures the search function used is based on the last
		// used function
		if (searchOption === "id") {
			getPatientById(
				apiContext.value,
				"e5c6bf5f-772f-4fee-8d72-4d05bca3027d",
				currentPage,
				rowsPerPage
			)
				.then((result: any) => {
					setPatientData(result)
				})
				.then(() => {
					setLoading(false)
				})
		} else if (searchOption === "name") {
			getPatientsByName(
				apiContext.value,
				searchInput,
				currentPage,
				rowsPerPage
			)
				.then((result: any) => {
					setPatientData(result)
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
			getPatientById(apiContext.value, searchInput, 0, rowsPerPage)
				.then((result: any) => {
					setPatientData(result)
				})
				.then(() => {
					setCurrentPage(0)
					setLoading(false)
				})
		} else if (searchOption === "name") {
			// seraches for name
			getPatientsByName(apiContext.value, searchInput, 0, rowsPerPage)
				.then((result: any) => {
					setPatientData(result)
				})
				.then(() => {
					setCurrentPage(0)
					setLoading(false)
				})
		}
	}

	// handles change of row count
	function handleChangeRowsPerPage(
		event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	): void {
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

	return (
		<div className="w-8/12">
			<div className="pt-6 flex flex-row">
				<article className="text-3xl font-semibold">
					Patient List
				</article>
			</div>
			<div className="py-3">
				<select
					className="select select-bordered select-sm max-w-xs"
					onChange={handleSelect}
					value={"id"}
				>
					<option value={"id"}>Search By ID</option>
					<option value={"name"}>Search By Name</option>
				</select>
			</div>
			<div className="flex flex-row">
				<input
					type="text"
					placeholder="Enter Query"
					className="input input-bordered w-full max-w-sm"
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
					<div className="pt-2">
						<SearchTable patientData={patientData} />
					</div>
					<div className="flex items-center justify-center text-center">
						<TablePagination
							component="div"
							count={10000}
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
