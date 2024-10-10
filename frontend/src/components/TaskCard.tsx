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
		<article className="task-card-container">
			<div className="task-card-header">
				<h3 className="task-title">{task.title}</h3>
				<MarkAsCompleteButton taskToUpdate={task} />
			</div>
			<div className="task-card-content">
				<p className="task-details-title">Details:</p>
				<p className="task-description">{task.description}</p>
			</div>
			<div className="task-tags-container">
				{task.tags.map((tag) => (
					<TagItem key={tag.id} color={tag.color} label={tag.label} />
				))}
			</div>
			<div className="task-card-footer">
				<EditTaskButton taskToEdit={task} />
				<DeleteTaskButton taskToDelete={task} />
			</div>
		</article>
	);
}
