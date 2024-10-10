import { useTasksStore } from "../store/taskStore";
import { AddTaskButton } from "./Buttons/AddTaskButton";
import { TaskCard } from "./TaskCard";

export function Dashboard() {
	const tasks = useTasksStore((state) => state.tasks);

	return (
		<div className="dashboard">
			<div className="counter-container">My counter</div>

			<div className="tasks-list-container">
				<div className="dashboard-btn-container">
					<AddTaskButton />
				</div>
				<div className="tasks-list">
					{tasks.length === 0 ? (
						<p className="empty-message">No tasks available</p>
					) : (
						tasks.map((task) => <TaskCard task={task} key={task.id} />)
					)}
				</div>
			</div>

			<div className="tools-container">Tools</div>
		</div>
	);
}
