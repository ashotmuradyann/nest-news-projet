import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import {Field, ObjectType} from "@nestjs/graphql";
import {UUIDScalar} from "../../uuid.scalar";;

@ObjectType()
@Entity("news")
export class NewsEntity{
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
  material: string

  @Field({nullable: true})
  @Column({nullable: true, default: "anonymous"})
  name: string

  @Field(() => UUIDScalar)
  @Column()
  category: string
}