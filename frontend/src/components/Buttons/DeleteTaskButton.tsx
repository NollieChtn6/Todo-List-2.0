import { useState, type MouseEvent, type FormEvent } from "react";

import { Button } from "primereact/button";

import { ConfirmPopup } from "primereact/confirmpopup"; // To use <ConfirmPopup> tag

import type { Task } from "../../@types/types";

type DeleteTaskButtonProps = {
	taskToDelete: Task;
	// onClick: () => void;
};

export function DeleteTaskButton({ taskToDelete }: DeleteTaskButtonProps) {
	const [confirmModalIsVisible, setConfirmModalIsVisible] =
		useState<boolean>(false);

	const handleClickOnDelete = (e: React.MouseEvent) => {
		e.preventDefault();
		setConfirmModalIsVisible(true);
	};

	const handleConfirmDelete = () => {
		console.log("Deleting task:", taskToDelete);
		setConfirmModalIsVisible(false);
	};

	return (
		<>
			<Button label="Delete task" onClick={handleClickOnDelete} />
			{confirmModalIsVisible && (
				<ConfirmPopup
					message="Are you sure you want to delete this task?"
					icon="pi pi-exclamation-triangle"
					acceptLabel="Yes"
					rejectLabel="No"
					visible={confirmModalIsVisible}
					onHide={() => setConfirmModalIsVisible(false)}
					accept={handleConfirmDelete}
				/>
			)}
		</>
	);
}
