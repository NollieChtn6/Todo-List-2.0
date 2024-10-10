import { type FormEvent, useEffect, useState, type CSSProperties } from "react";

import { Dialog } from "primereact/dialog";
import { MultiSelect } from "primereact/multiselect";
import { InputTextarea } from "primereact/inputtextarea";
import { FloatLabel } from "primereact/floatlabel";

import { InputText } from "../InputText";
import { Button } from "primereact/button";
import { AddTagButton } from "../Buttons/AddTagButton";

import { useTagsStore } from "../../store/tagStore";
import type { Tag } from "../../@types/types";
import { TagItem } from "../TagItem";

import { addTask } from "../../requests/tasksRequests";

type TaskFormProps = {
	header: string;
	visible: boolean;
	style?: React.CSSProperties;
	onHide: () => void;
};

type NewTaskProps = {
	title: string;
	description: string;
	tags: Tag[];
};

export function TaskForm({ header, visible, onHide }: TaskFormProps) {
	const [isVisible, setIsVisible] = useState<boolean>(false);

	const customStyle: CSSProperties = {
		width: "50vw",
		maxWidth: "400px",
		height: "60vh",
	};
	const tags = useTagsStore((state) => state.tags);

	const [formData, setFormData] = useState<NewTaskProps>({
		title: "",
		description: "",
		tags: [],
	});

	const handleInputChange = (field: keyof typeof formData, value: string) => {
		setFormData((prevData) => ({
			...prevData,
			[field]: value,
		}));
	};

	const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			console.log(formData);
			await addTask(formData);
			onHide();
		} catch (error) {
			console.error("Error while submitting form:", error);
			// TODO: display errors on UI
		}
	};

	useEffect(() => {
		setIsVisible(isVisible);
	}, [isVisible]);

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
			footer={
				<div className="btn-container">
					<Button className="btn confirm-btn" type="submit">
						Confirm
					</Button>
				</div>
			}
		>
			<form className="form" onSubmit={handleFormSubmit}>
				<div className="separator separator-sm" />
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

				<FloatLabel className="float-label">
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
			</form>
		</Dialog>
	);
}
