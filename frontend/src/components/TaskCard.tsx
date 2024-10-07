import { Panel } from "primereact/panel";
import { TagItem } from "./TagItem";
import { EditTaskButton } from "./Buttons/EditButton";
import { DeleteTaskButton } from "./Buttons/DeleteTaskButton";
import { MarkAsCompleteButton } from "./Buttons/MarkAsCompleteButton";

import type { Task } from "../@types/types";

type TaskCardProps = {
	task: Task;
};

export function TaskCard({ task }: TaskCardProps) {
	return (
		<>
			<Panel header={task.title} toggleable>
				{task.isComplete && <p>Task is complete</p>}
				<p className="m-0">{task.description}</p>
				{task.tags.map((tag) => (
					<TagItem key={tag.id} label={tag.label} color={tag.color} />
				))}
			</Panel>
			<EditTaskButton taskToEdit={task} />
			<DeleteTaskButton taskToDelete={task} />
			<MarkAsCompleteButton taskToUpdate={task} />
		</>
	);
}

type MarkTaskAsCompleteData = {
	id: number;
	isComplete: boolean;
};

export const markTaskAsComplete = async ({
	id,
	isComplete,
}: MarkTaskAsCompleteData) => {
	const response = await axiosInstance.patch(`/tasks/${id}/mark-complete`, {
		isComplete,
	});
	return response.data;
};
