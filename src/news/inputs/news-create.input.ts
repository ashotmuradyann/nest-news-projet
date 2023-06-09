import { Field, InputType } from "@nestjs/graphql";
import { IsUUID } from "class-validator";
import { MaxLength } from "class-validator";

@InputType()
export class NewsCreateInput{
  @Field()
  material: string

  @Field({nullable:true})
  @MaxLength(10)
  name: string

  @Field()
  @IsUUID()
  category: string
}