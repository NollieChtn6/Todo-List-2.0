import { type CSSProperties, type FormEvent, useEffect, useState } from "react";

import { Dialog } from "primereact/dialog";
import { FloatLabel } from "primereact/floatlabel";
import { InputTextarea } from "primereact/inputtextarea";
import { MultiSelect } from "primereact/multiselect";

import { Button } from "primereact/button";
import { AddTagButton } from "../Buttons/AddTagButton";
import { InputText } from "../InputText";

import type { Task } from "../../@types/types";
import { useTagsStore } from "../../store/tagStore";
import { TagItem } from "../TagItem";

type TaskFormProps = {
	header: string;
	visible: boolean;
	style?: React.CSSProperties;
	onHide: () => void;
	selectedTask: Task;
};

export function EditTaskForm({
	header,
	visible,
	onHide,
	selectedTask,
}: TaskFormProps) {
	const [_isVisible, setIsVisible] = useState<boolean>(false);
	const customStyle: CSSProperties = {
		width: "50vw",
		height: "70vh",
	};
	const tags = useTagsStore((state) => state.tags);

	const [formData, setFormData] = useState<Task>({
		id: selectedTask.id,
		title: selectedTask.title,
		description: selectedTask.description,
		tags: selectedTask.tags,
		isComplete: selectedTask.isComplete,
	});

	const handleInputChange = (field: keyof typeof formData, value: string) => {
		setFormData((prevData) => ({
			...prevData,
			[field]: value,
		}));
	};

	const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log(formData);
	};

	useEffect(() => {
		setFormData(selectedTask);
	}, [selectedTask]);

	return (
		<Dialog
			className="task-form"
			header={header}
			visible={visible}
			style={customStyle}
			onHide={() => {
				setIsVisible(false);
				onHide();
			}}
		>
			<form className="form" onSubmit={handleFormSubmit}>
				<InputText
					input={{
						id: "title-input",
						value: formData.title,
						className: "form-input",
						onChange: (e) => handleInputChange("title", e.target.value),
						required: true,
					}}
					label={{
						htmlFor: "title-input",
						text: "Title",
					}}
				/>
				<div className="separator separator-sm" />

				<FloatLabel>
					<InputTextarea
						id="task-description"
						value={formData.description}
						onChange={(e) => handleInputChange("description", e.target.value)}
						autoResize={true}
						className="form-input"
					/>
					<label htmlFor="task-description">Description</label>
				</FloatLabel>
				<div className="separator separator-sm" />
				<MultiSelect
					value={formData.tags}
					onChange={(e) => handleInputChange("tags", e.value)}
					options={tags}
					display="chip"
					placeholder="Select tags..."
					maxSelectedLabels={5}
					className="w-full md:w-20rem"
				/>
				<div className="separator separator-sm" />
				<p>Selected tags:</p>
				{formData.tags.map((selectedTag) => (
					<TagItem
						key={selectedTag.id}
						label={selectedTag.label}
						color={selectedTag.color}
					/>
				))}
				<div className="separator separator-sm" />
				<AddTagButton />
				<div className="btn-container">
					<Button className="btn confirm-btn" type="submit">
						Confirm
					</Button>
				</div>
			</form>
		</Dialog>
	);
}
