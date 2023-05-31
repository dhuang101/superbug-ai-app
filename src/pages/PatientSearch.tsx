import React, { ChangeEvent, useEffect, useState } from "react"
import {
	getPatientList,
	getPatientById,
	getPatientsByName,
} from "../services/PatientSearch"
import NavBar from "../components/NavBar"
import Breadcrumbs from "../components/Breadcrumbs"
import MainTable from "../components/MainTable"
import { CircularProgress, TablePagination } from "@mui/material"

function PatientSearch() {
	const [loading, setLoading] = useState(true)
	const [patientData, setPatientData] = useState([])
	const [searchInput, setSearchInput] = useState("")
	const [currentPage, setCurrentPage] = useState(0)
	const [rowsPerPage, setRowsPerPage] = useState(10)
	const [lastSearch, setLastSearch] = useState("list")

	// use effect controls which service is run based on the last search run
	// also handles the pages and row per page change
	useEffect(() => {
		// set loading flag
		setLoading(true)
		// fetch patients
		if (lastSearch === "list") {
			getPatientList(currentPage, rowsPerPage)
				.then((result: any) => {
					setPatientData(result)
				})
				.then(() => {
					setLoading(false)
				})
		} else if (lastSearch === "id") {
			getPatientById(searchInput, currentPage, rowsPerPage)
				.then((result: any) => {
					setPatientData(result)
				})
				.then(() => {
					setLoading(false)
				})
		} else if (lastSearch === "name") {
			getPatientsByName(searchInput, currentPage, rowsPerPage)
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

	// starts the search
	function handleSearch() {
		// does not search when search bar is empty
		if (searchInput === "") {
			return
		}
		// sets loading flag
		setLoading(true)
		// checks if the serach bar is an id or a name
		if (searchInput.match(/^\d+$/)) {
			// searches for id
			getPatientById(searchInput, 0, rowsPerPage)
				.then((result: any) => {
					setPatientData(result)
				})
				.then(() => {
					setLastSearch("id")
					setCurrentPage(0)
					setLoading(false)
				})
		} else {
			// seraches for name
			getPatientsByName(searchInput, 0, rowsPerPage)
				.then((result: any) => {
					setPatientData(result)
				})
				.then(() => {
					setLastSearch("name")
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
		<div className="flex flex-col min-h-screen min-w-screen items-center bg-gray-200">
			<NavBar />
			<div className="w-8/12">
				<div className="pt-2 pb-4">
					<Breadcrumbs />
				</div>
				<div className="flex flex-row">
					<article className="text-3xl font-semibold">
						Patient List
					</article>
				</div>
				<div className="flex flex-row pt-3">
					<input
						type="text"
						placeholder="Search For ID/Name"
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
				) : (
					<div className="pt-2">
						<MainTable patientData={patientData} />
					</div>
				)}
				<div className="pt-4 flex items-center justify-center text-center">
					<TablePagination
						hidden={loading}
						component="div"
						count={10000}
						page={currentPage}
						onPageChange={handleChangePage}
						rowsPerPage={rowsPerPage}
						onRowsPerPageChange={handleChangeRowsPerPage}
					/>
				</div>
			</div>
		</div>
	)
}

export default PatientSearch
