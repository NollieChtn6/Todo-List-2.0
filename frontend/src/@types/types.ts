export type Tag = {
	id: number;
	label: string;
	color: string;
};

export type Task = {
	id: number;
	title: string;
	description: string | null;
	isComplete: boolean;
	tags: Tag[];
};
