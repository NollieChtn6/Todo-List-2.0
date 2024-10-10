import { Button } from "primereact/button";
import { useState } from "react";

import { TaskForm } from "../Forms/TaskForm";

export function AddTaskButton() {
	const [formIsOpen, setFormIsOpen] = useState<boolean>(false);

	return (
		<>
			<Button
				label="Add task"
				icon="pi pi-plus"
				onClick={() => setFormIsOpen(true)}
				className="btn add-task-btn"
			/>

			{formIsOpen && (
				<TaskForm
					visible
					header="New task"
					onHide={() => {
						if (!formIsOpen) return;
						setFormIsOpen(false);
					}}
				/>
			)}
		</>
	);
}
