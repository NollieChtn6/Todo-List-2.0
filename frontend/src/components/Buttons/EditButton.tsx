import { Button } from "primereact/button";
import { useState } from "react";
import { EditTaskForm } from "../Forms/EditTaskForm";

import type { Task } from "../../@types/types";

type TaskToEditProps = {
	taskToEdit: Task;
};

export function EditTaskButton({ taskToEdit }: TaskToEditProps) {
	const [formIsOpen, setFormIsOpen] = useState<boolean>(false);

	return (
		<>
			<Button
				label="Edit task"
				className="edit-task-btn"
				onClick={() => setFormIsOpen(true)}
			/>

			{formIsOpen && (
				<EditTaskForm
					visible
					header="Edit task"
					onHide={() => {
						if (!formIsOpen) return;
						setFormIsOpen(false);
					}}
					selectedTask={taskToEdit}
				/>
			)}
		</>
	);
}
