import { useRouter } from "next/router"
import {
	Gantt,
	Task,
	EventOption,
	StylingOption,
	ViewMode,
	DisplayOption,
} from "gantt-task-react"
import "gantt-task-react/dist/index.css"
import Breadcrumbs from "../../../../components/Breadcrumbs"

function InfLocaSummary() {
	// router
	const router = useRouter()

	let tasks: Task[] = [
		{
			start: new Date(2020, 1, 1),
			end: new Date(2020, 1, 2),
			name: "Idea",
			id: "Task 0",
			type: "task",
			progress: 45,
			isDisabled: true,
			styles: {
				progressColor: "#ffbb54",
				progressSelectedColor: "#ff9e0d",
			},
		},
	]

	return (
		<div className="flex flex-col w-8/12">
			<Breadcrumbs />
			<article className="text-3xl mb-4 font-semibold">
				{router.query.resourceName}
			</article>
			<div className="flex justify-center">
				<Gantt tasks={tasks} />
			</div>
		</div>
	)
}

export default InfLocaSummary
