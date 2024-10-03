import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "tag" })
export class TagSQLiteModel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 200 })
  label!: string;

  @Column({ length: 7 })
  color!: string;
}
