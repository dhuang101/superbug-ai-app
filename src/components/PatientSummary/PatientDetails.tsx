interface Props {
	patientData: validatedObject
}

function PatientDetails(props: any) {
	return (
		<div className="mt-6 mx-6 h-full">
			<div className=" h-1/4 flex items-center">
				<article className="flex h-full w-2/12 pl-6 items-center border-solid border-2 border-slate-200 bg-slate-100">
					Name
				</article>
				<article className="flex h-full w-4/12 pl-6 items-center border-solid border-y-2 border-slate-200">
					{props.patientData.name}
				</article>
				<article className="flex h-full w-2/12 pl-6 items-center border-solid border-2 border-slate-200 bg-slate-100">
					Gender
				</article>
				<article className="flex h-full w-4/12 pl-6 items-center border-solid border-y-2 border-r-2 border-slate-200">
					{props.patientData.gender}
				</article>
			</div>
			<div className=" h-1/4 flex items-center">
				<article className="flex h-full w-2/12 pl-6 items-center border-solid border-x-2 border-slate-200 bg-slate-100">
					Date of Birth
				</article>
				<article className="flex h-full w-4/12 pl-6 items-center border-solid border-slate-200">
					{props.patientData.birthDate}
				</article>
				<article className="flex h-full w-2/12 pl-6 items-center border-solid border-x-2 border-slate-200 bg-slate-100">
					Phone Number
				</article>
				<article className="flex h-full w-4/12 pl-6 items-center border-solid border-r-2 border-slate-200">
					{props.patientData.phoneNum}
				</article>
			</div>
			<div className=" h-1/4 flex items-center">
				<article className="flex h-full w-2/12 pl-6 items-center border-solid border-2 border-slate-200 bg-slate-100">
					Last Updated
				</article>
				<article className="flex h-full w-4/12 pl-6 items-center border-solid border-y-2 border-slate-200">
					{props.patientData.lastUpdated}
				</article>
				<article className="flex h-full w-2/12 pl-6 items-center border-solid border-2 border-slate-200 bg-slate-100">
					Address
				</article>
				<article className="flex h-full w-4/12 pl-6 items-center border-solid border-y-2 border-r-2 border-slate-200">
					{props.patientData.address}
				</article>
			</div>
		</div>
	)
}

export default PatientDetails
