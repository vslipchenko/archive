import {InputType, Field} from "type-graphql";

@InputType()
export class CreateUserInput {
    @Field()
    userName!: string;

    @Field()
    email!: string;

    @Field()
    fullName!: string;
}