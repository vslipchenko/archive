import {Resolver, Query, Mutation, Arg} from 'type-graphql';
import User from '../entities/user.entity';
import {getRepository} from 'typeorm';
import {CreateUserInput} from '../inputs/user.create.input';

@Resolver()
export class UserResolver {

    @Query(() => [User])
    async users() {
        const user = await getRepository(User).find();
        console.log(user);
        return user;
    }

    @Mutation(() => User)
    async createUser(@Arg("data", {validate: false}) data: CreateUserInput) {
        const userRepository = getRepository(User);
        const user = userRepository.create(data);
        await userRepository.save(user);
        return user;
    }
}