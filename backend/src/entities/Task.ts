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

	@Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
	@IsDate()
	createdAt: Date = new Date();

	@Column({ default: false })
	isComplete!: boolean;

	@ManyToMany(() => Tag, { cascade: true })
	@JoinTable({
		name: "task_has_tags",
		joinColumn: {
			name: "taskId",
			referencedColumnName: "id",
		},
		inverseJoinColumn: {
			name: "tagId",
			referencedColumnName: "id",
		},
	})
	tags?: Tag[];
}
