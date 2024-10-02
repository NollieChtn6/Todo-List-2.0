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
	@Length(7, 7, { message: "Color hex code must be 7 character-long" })
	color!: string;

	@ManyToMany(
		() => Task,
		(task) => task.tags,
	)
	@JoinTable()
	tasks?: Task[];
}
