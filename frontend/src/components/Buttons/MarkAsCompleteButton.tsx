import { useState } from "react";

import { InputSwitch } from "primereact/inputswitch";

import type { Task } from "../../@types/types";

type MarkAsCompleteButtonProps = {
	taskToUpdate: Task;
	// onStatusChange: (updatedTask: Task) => void;
};

export function MarkAsCompleteButton({
	taskToUpdate,
}: MarkAsCompleteButtonProps) {
	const [formData, setFormData] = useState<Task>({
		id: taskToUpdate.id,
		title: taskToUpdate.title,
		description: taskToUpdate.description,
		tags: taskToUpdate.tags,
		isComplete: taskToUpdate.isComplete,
	});

	const handleInputChange = (field: keyof typeof formData, value: boolean) => {
		setFormData((prevData) => ({
			...prevData,
			[field]: value,
		}));
		console.log("Task is complete:", formData.isComplete);
	};

	return (
		<InputSwitch
			checked={formData.isComplete}
			onChange={(e) => handleInputChange("isComplete", e.value)}
			tooltip={formData.isComplete ? "Mark as incomplete" : "Mark as complete"}
		/>
	);
}
