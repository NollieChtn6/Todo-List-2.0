import { Tag } from "primereact/tag";

type TagItemProps = {
	label: string;
	color: string;
};

export function TagItem({ label, color }: TagItemProps) {
	return (
		<Tag className="tag-item" style={{ background: color }}>
			{label}
		</Tag>
	);
}
