import { User } from "../entities/User";
import { ObjectType, Field } from "type-graphql";
import { UserError } from "./UserError";

@ObjectType()
export class UserResponse {
  @Field(() => [UserError], { nullable: true })
  errors?: UserError[];

  @Field(() => User, { nullable: true })
  user?: User;
}
