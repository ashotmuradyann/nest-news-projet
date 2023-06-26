import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import {Field, ObjectType} from "@nestjs/graphql";
import {UUIDScalar} from "../../uuid.scalar";
import { NewsEntity } from "../../news/entities/news.entity";

;

@ObjectType()
@Entity("categories")
export class CategoryEntity{
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
  title: string

  @Field({nullable: true})
  @Column({nullable: true})
  description?: string

  @Field(()=>[NewsEntity], {nullable:true})
  @ManyToMany(()=>NewsEntity, news => news.categories)
  news: NewsEntity[]
}