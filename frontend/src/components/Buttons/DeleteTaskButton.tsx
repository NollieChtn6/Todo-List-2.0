import { useState } from "react";
import { Button } from "primereact/button";
import { ConfirmPopup } from "primereact/confirmpopup";

import type { Task } from "../../@types/types";
import { deleteTask } from "../../requests/tasksRequests";

type DeleteTaskButtonProps = {
	taskToDelete: Task;
};

export function DeleteTaskButton({ taskToDelete }: DeleteTaskButtonProps) {
	const [confirmModalIsVisible, setConfirmModalIsVisible] =
		useState<boolean>(false);

	const handleClickOnDelete = (e: React.MouseEvent) => {
		e.preventDefault();
		setConfirmModalIsVisible(true);
	};

	const handleConfirmDelete = async () => {
		console.log("Deleting task:", taskToDelete);
		try {
			await deleteTask({ id: taskToDelete.id });
			console.log(`Task ${taskToDelete.id} deleted successfully.`);
		} catch (error) {
			console.error("Error while deleting task:", error);
		}
	};

	return (
		<>
			<Button
				className="btn delete-btn"
				label="Delete task"
				icon="pi pi-trash"
				onClick={handleClickOnDelete}
			/>
			<ConfirmPopup
				message="Are you sure you want to delete this task?"
				icon="pi pi-exclamation-triangle"
				acceptLabel="Yes"
				rejectLabel="No"
				visible={confirmModalIsVisible}
				onHide={() => setConfirmModalIsVisible(false)}
				accept={handleConfirmDelete}
				className="delete-popup"
			/>
		</>
	);
}
