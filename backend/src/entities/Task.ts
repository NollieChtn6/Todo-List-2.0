import {
	BaseEntity,
	Column,
	Entity,
	PrimaryGeneratedColumn,
	ManyToMany,
	JoinTable,
} from "typeorm";

import { Length, IsDate } from "class-validator";
import { Tag } from "./Tag";

@Entity()
export class Task extends BaseEntity {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({ length: 200 })
	@Length(3, 100, { message: "Title should have at least 3 characters." })
	title!: string;

	@Column()
	description?: string;

	@Column()
	@IsDate()
	createdAt: Date = new Date();

	@Column()
	isComplete!: boolean;

	@ManyToMany(
		() => Tag,
		(tag) => tag.tasks,
		{ cascade: true },
	)
	@JoinTable()
	tags?: Tag[];
}
