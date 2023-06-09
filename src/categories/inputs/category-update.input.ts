import { Field, InputType } from "@nestjs/graphql";
import { IsUUID } from "class-validator";

@InputType()
export class CategoryUpdateInput{
  @Field()
  @IsUUID(4)
  id: string

  @Field({nullable:true})
  title: string

  @Field({nullable:true})
  description: string
}