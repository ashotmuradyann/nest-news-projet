import { Field, InputType } from "@nestjs/graphql";
import { IsUUID } from "class-validator";

@InputType()
export class NewsUpdateInput{
  @Field()
  @IsUUID(4)
  id: string

  @Field({nullable:true})
  material: string

  @Field({nullable:true})
  name: string

  @Field({nullable:true})
  @IsUUID()
  category: string
}