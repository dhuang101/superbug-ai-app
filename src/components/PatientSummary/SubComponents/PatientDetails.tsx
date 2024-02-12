import { patientValidated } from "../../../types/ValidationTypes"

interface Props {
	patientData: patientValidated
}

function PatientDetails(props: Props) {
	return (
		<div className="w-full h-full">
			<div className="flex min-h-[30%] h-fit items-stretch">
				<article className="flex w-2/12 px-4 items-center rounded-tl-lg border-solid border-2 border-secondary-focus bg-base-200">
					Name
				</article>
				<article className="flex w-4/12 px-4 items-center border-solid border-y-2 border-secondary-focus">
					{props.patientData.name}
				</article>
				<article className="flex w-2/12 px-4 items-center border-solid border-2 border-secondary-focus bg-base-200">
					Gender
				</article>
				<article className="flex w-4/12 px-4 items-center rounded-tr-lg border-solid border-y-2 border-r-2 border-secondary-focus">
					{props.patientData.gender}
				</article>
			</div>
			<div className="flex min-h-[30%] h-fit items-stretch">
				<article className="flex w-2/12 px-4 items-center border-solid border-x-2 border-secondary-focus bg-base-200">
					Date of Birth
				</article>
				<article className="flex w-4/12 px-4 items-center border-solid border-secondary-focus">
					{props.patientData.birthDate}
				</article>
				<article className="flex w-2/12 px-4 items-center border-solid border-x-2 border-secondary-focus bg-base-200">
					Phone Number
				</article>
				<article className="flex w-4/12 px-4 items-center border-solid border-r-2 border-secondary-focus">
					{props.patientData.phoneNum}
				</article>
			</div>
			<div className="flex h-fit items-stretch">
				<article className="flex w-2/12 px-4 items-center rounded-bl-lg border-solid border-2 border-secondary-focus bg-base-200">
					Last Updated
				</article>
				<article className="flex w-4/12 px-4 items-center border-solid border-y-2 border-secondary-focus">
					{props.patientData.lastUpdated}
				</article>
				<article className="flex w-2/12 px-4 items-center border-solid border-2 border-secondary-focus bg-base-200">
					Address
				</article>
				<article className="flex w-4/12 px-4 items-center rounded-br-lg border-solid border-y-2 border-r-2 border-secondary-focus">
					{props.patientData.address}
				</article>
			</div>
		</div>
	)
}

export default PatientDetails
