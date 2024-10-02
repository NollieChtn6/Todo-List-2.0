import {
	BaseEntity,
	Column,
	Entity,
	PrimaryGeneratedColumn,
	ManyToMany,
	JoinTable,
} from "typeorm";
import { Matches } from "class-validator";
import { Task } from "./Task";

@Entity()
export class Tag extends BaseEntity {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({ length: 200 })
	label!: string;

	@Column({ length: 7 })
	@Matches(/#?([\da-fA-F]{2})([\da-fA-F]{2})([\da-fA-F]{2})/, {
		message: "Color must be a valid hex code.",
	})
	color!: string;

	@ManyToMany(
		() => Task,
		(task) => task.tags,
	)
	@JoinTable()
	tasks?: Task[];
}
