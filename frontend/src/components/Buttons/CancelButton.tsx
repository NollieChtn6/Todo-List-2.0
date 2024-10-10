import { Button } from "primereact/button";

type CancelButtonProps = {
	onClick: () => void;
};

export function CancelButton({ onClick }: CancelButtonProps) {
	return <Button label="Cancel" className="btn cancel-btn" onClick={onClick} />;
}
