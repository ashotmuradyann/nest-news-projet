import { Field, InputType } from "@nestjs/graphql";
import { IsOptional, IsUUID } from "class-validator";

@InputType()
export class NewsUpdateInput{
  @Field()
  @IsUUID(4)
  id: string

  @Field({nullable:true})
  material: string

  @Field({nullable:true})
  name: string

  @Field(()=>[String], {nullable: true})
  @IsOptional()
  @IsUUID(4,{each:true})
  categories: string[]

  @Field(()=>[String], {nullable: true})
  @IsOptional()
  @IsUUID(4,{each:true})
  medias: string[]
}