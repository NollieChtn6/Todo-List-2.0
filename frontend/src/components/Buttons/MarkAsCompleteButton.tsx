import { useState } from "react";

import { InputSwitch } from "primereact/inputswitch";

import type { Task } from "../../@types/types";
import { markTaskAsComplete } from "../../requests/tasksRequests";

type MarkAsCompleteButtonProps = {
	taskToUpdate: Task;
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

	const handleInputChange = async (
		field: keyof typeof formData,
		value: boolean,
	) => {
		setFormData((prevData) => ({
			...prevData,
			[field]: value,
		}));
		try {
			const updatedTask = await markTaskAsComplete({
				id: taskToUpdate.id,
				isComplete: value,
			});
			console.log(
				`Task ${taskToUpdate.id} marked as ${
					value ? "complete" : "incomplete"
				}`,
			);
		} catch (error) {
			console.error("Error while changing task status:", error);
		}
	};

	return (
		<InputSwitch
			checked={formData.isComplete}
			onChange={(e) => handleInputChange("isComplete", e.value)}
			tooltip={formData.isComplete ? "Mark as incomplete" : "Mark as complete"}
		/>
	);
}
