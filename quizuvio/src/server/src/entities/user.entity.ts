import {Entity, ObjectIdColumn, Column, ObjectID} from "typeorm";
import {ObjectType, Field, ID} from "type-graphql";

@Entity()
@ObjectType()
export default class User {
    @Field(() => ID)
    @ObjectIdColumn()
    id!: ObjectID;

    @Field(() => String)
    @Column()
    userName!: string;

    @Field(() => String)
    @Column()
    fullName!: string;

    @Field(() => String)
    @Column()
    email!: string;
}