import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import {Field, ObjectType} from "@nestjs/graphql";
import {UUIDScalar} from "../../uuid.scalar";;

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
}