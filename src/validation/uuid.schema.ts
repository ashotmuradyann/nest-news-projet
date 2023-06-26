import { Field, InputType } from "@nestjs/graphql";
import { IsUUID } from "class-validator";

@InputType()
export class UuidInput{
  @IsUUID(4)
  @Field()
  id: string
}