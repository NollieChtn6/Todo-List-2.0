import {
	BaseEntity,
	Column,
	Entity,
	PrimaryGeneratedColumn,
	ManyToMany,
	JoinTable,
} from "typeorm";
import { Task } from "./Task";

@Entity()
export class Tag extends BaseEntity {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({ length: 200 })
	label!: string;

	@Column({ length: 7 })
	color!: string;

	@Column()
	isComplete!: boolean;

	@ManyToMany(() => Task)
	@JoinTable()
	tasks!: Task[];
}
