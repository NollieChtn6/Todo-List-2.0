import { BaseEntity, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

import { TagSQLiteModel } from "./Tag";

@Entity({ name: "task" })
export class TaskSQLiteModel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 200 })
  title!: string;

  @Column()
  description?: string;

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date = new Date();

  @Column({ default: false })
  isComplete!: boolean;

  // Useful resource on relations: https://orkhan.gitbook.io/typeorm/docs/relations
  @ManyToMany(() => TagSQLiteModel, { cascade: true })
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
  tags?: TagSQLiteModel[];
}
