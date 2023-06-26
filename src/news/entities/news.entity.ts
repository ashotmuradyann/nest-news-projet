import {
  Column,
  CreateDateColumn,
  Entity, JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import {Field, ObjectType} from "@nestjs/graphql";
import {UUIDScalar} from "../../uuid.scalar";
import { CategoryEntity } from "../../categories/entities/category.entity";
import { FilesEntity } from "../../files/files.entity";

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

  @Field(()=>[CategoryEntity],{nullable: true})
  @ManyToMany(() => CategoryEntity, category => category.news)
  @JoinTable()
  categories: CategoryEntity[]

  @Field(()=>[FilesEntity],{nullable: true})
  @OneToMany(()=>FilesEntity, file => file.news, {eager: true, cascade: true})
  medias: FilesEntity[]
}