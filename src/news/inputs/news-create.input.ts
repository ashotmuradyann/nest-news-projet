import { Field, InputType } from "@nestjs/graphql";
import { IsOptional, IsUUID } from "class-validator";
import { MaxLength } from "class-validator";

@InputType()
export class NewsCreateInput{
  @Field()
  material: string

  @Field({nullable:true})
  @MaxLength(10)
  name: string

  @Field(()=>[String])
  @IsUUID(4,{each:true})
  categories: string[]

  @Field(()=>[String], {nullable: true})
  @IsOptional()
  @IsUUID(4,{each:true})
  medias: string[]
}