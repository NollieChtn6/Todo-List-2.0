type TagItemProps = {
	label: string;
	color: string;
};

export function TagItem({ label, color }: TagItemProps) {
	return (
		<div className="tag" style={{ backgroundColor: `${color}` }}>
			{label}
		</div>
	);
}
