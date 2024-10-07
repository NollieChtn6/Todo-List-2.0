import { useTasksStore } from "../store/taskStore";
import { AddTaskButton } from "./Buttons/AddTaskButton";
import { TaskCard } from "./TaskCard";

import { Button } from "primereact/button";

export function Dashboard() {
	const tasks = useTasksStore((state) => state.tasks);
	const tasksStackIsEmpty: boolean = tasks.length === 0;
	return (
		<div className="dashboard">
			<p>This is my dashboard</p>
			<AddTaskButton />
			{tasks.map((task) => (
				<TaskCard task={task} key={task.id} />
			))}

			{/* Si pas de tâches dans la liste, afficher un bouton "add Task", sinon 1 taskCard par item. */}
		</div>
	);
}
