import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import {Field, ObjectType} from "@nestjs/graphql";
import {UUIDScalar} from "../uuid.scalar";
import { NewsEntity } from "../news/entities/news.entity";

@ObjectType()
@Entity("files")
export class FilesEntity{
  @Field(() => UUIDScalar)
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Field()
  @CreateDateColumn()
  createdAt: Date

  @Field()
  @UpdateDateColumn()
  updatedAt: Date

  @Field()
  @Column()
  path: string

  @Field()
  @Column()
  size: number

  @Field()
  @Column()
  name: string

  @Field(()=>FilesEntity,{nullable: true})
  @ManyToOne(() => NewsEntity, news => news.medias, {onDelete:"SET NULL", onUpdate: "NO ACTION"})
  news: NewsEntity
}