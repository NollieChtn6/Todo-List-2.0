import {
	BaseEntity,
	Column,
	Entity,
	PrimaryGeneratedColumn,
	ManyToMany,
	JoinTable,
} from "typeorm";
import { Tag } from "./Tag";

@Entity()
export class Task extends BaseEntity {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({ length: 200 })
	title!: string;

	@Column()
	description?: string;

	@Column()
	createdAt!: Date;

	@Column()
	isComplete!: boolean;

	@ManyToMany(() => Tag)
	@JoinTable()
	tags?: Tag[];
}
