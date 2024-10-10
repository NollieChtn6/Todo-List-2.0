import { type FormEvent, useEffect, useState, type CSSProperties } from "react";

import { Dialog } from "primereact/dialog";
import { ColorPicker } from "primereact/colorpicker";
import { Button } from "primereact/button";

import { InputText } from "../InputText";
import { addTag } from "../../requests/tagsRequests";

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
		height: "40vh",
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

	const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			console.log(formData);
			await addTag(formData);
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
				<label
					htmlFor="color-picker"
					style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}
				>
					Pick a color!
				</label>
				<div
					className="color-picker-container"
					style={{ display: "flex", alignItems: "center" }}
				>
					<ColorPicker
						id="color-picker"
						format="hex"
						value={formData.color}
						onChange={(e) => {
							const hexValue = `#${e.value}`;
							handleInputChange("color", hexValue);
						}}
					/>
					<p
						style={{
							marginLeft: "10px",
							backgroundColor: "#f0f0f0",
							border: "1px solid #ccc",
							padding: "5px",
							borderRadius: "4px",
							color: "#999",
							opacity: 0.7,
							minWidth: "80px",
							textAlign: "center",
						}}
					>
						{formData.color}
					</p>
				</div>

				<div
					className="btn-container"
					style={{
						display: "flex",
						justifyContent: "center",
						marginTop: "20px",
					}}
				>
					<Button className="btn confirm-btn" type="submit">
						Confirm
					</Button>
				</div>
			</form>
		</Dialog>
	);
}
