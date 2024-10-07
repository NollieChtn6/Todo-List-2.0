import { Button } from "primereact/button";
import { useState } from "react";

import { TagForm } from "../Forms/TagForm";

export function AddTagButton() {
	const [formIsOpen, setFormIsOpen] = useState<boolean>(false);

	return (
		<>
			<Button label="Add tag" onClick={() => setFormIsOpen(true)} />

			{formIsOpen && (
				<TagForm
					visible
					header="New tag"
					onHide={() => {
						if (!formIsOpen) return;
						setFormIsOpen(false);
					}}
				/>
			)}
		</>
	);
}
