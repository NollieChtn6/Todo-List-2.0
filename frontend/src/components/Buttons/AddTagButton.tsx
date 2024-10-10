import { Button } from "primereact/button";
import { useState } from "react";
import { TagForm } from "../Forms/TagForm";

export function AddTagButton() {
	const [formIsOpen, setFormIsOpen] = useState<boolean>(false);

	return (
		<>
			<Button
				label="Create Tag"
				icon="pi pi-plus"
				onClick={() => setFormIsOpen(true)}
				className="btn add-tag-btn"
			/>

			{formIsOpen && (
				<TagForm
					visible
					header="New Tag"
					onHide={() => {
						if (!formIsOpen) return;
						setFormIsOpen(false);
					}}
				/>
			)}
		</>
	);
}
