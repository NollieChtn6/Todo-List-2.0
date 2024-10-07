import { type FormEvent, useEffect, useState, type CSSProperties } from "react";

import { Dialog } from "primereact/dialog";
import { ColorPicker } from "primereact/colorpicker";
import { Button } from "primereact/button";

import { InputText } from "../InputText";

type TagFormProps = {
	header: string;
	visible: boolean;
	style?: React.CSSProperties;
	onHide: () => void;
};

type NewTag = {
	label: string;
	color: string;
};

export function TagForm({ header, visible, onHide }: TagFormProps) {
	const [isVisible, setIsVisible] = useState<boolean>(false);
	const customStyle: CSSProperties = {
		width: "30vw",
		height: "50vh",
		backgroundColor: "gray",
	};

	const [formData, setFormData] = useState<NewTag>({
		label: "",
		color: "#000000",
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
		>
			<form className="form" onSubmit={handleFormSubmit}>
				<InputText
					input={{
						id: "label-input",
						value: formData.label,
						className: "form-input",
						onChange: (e) => handleInputChange("label", e.target.value),
						required: true,
					}}
					label={{
						htmlFor: "label-input",
						text: "Label",
					}}
				/>
				<div className="separator separator-sm" />
				<div className="color-picker-container">
					<label htmlFor="color-picker">Pick a color!</label>
					<ColorPicker
						id="color-picker"
						format="hex"
						value={formData.color}
						onChange={(e) => {
							const hexValue = `#${e.value}`;
							handleInputChange("color", hexValue);
						}}
					/>
					<p>{formData.color}</p>
				</div>

				<div className="btn-container">
					<Button className="btn confirm-btn" type="submit">
						Confirm
					</Button>
				</div>
			</form>
		</Dialog>
	);
}
