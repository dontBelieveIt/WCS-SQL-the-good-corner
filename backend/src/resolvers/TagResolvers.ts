import { Arg, Field, ID, InputType, Mutation, Query, Resolver } from "type-graphql";
import Tag from "../entities/Tag";
import Ad from "../entities/Ad";
import { FindManyOptions } from "typeorm";

@InputType()
class TagInput {

    @Field()
    title!: string;
}

@Resolver(Tag)
export default class TagResolver {
    @Query(() => [Tag])
    async getAllTags() {
        let findOptions: FindManyOptions<Tag> = {
            relations: { ads: true },
        }
        try {
            const allTags = await Tag.find(findOptions);
            console.info(200);
            return allTags;
        } catch (error) {
            console.error(500 + `${error}`);
            throw new Error(500 + ": an error occured : read tags");
        }
    }

    @Mutation(() => ID)
    async createTag(@Arg("data") data: TagInput) {
        const newTag = Tag.create({ ...data });
        try {
            await newTag.save();
            console.info(`New tag "${data.title}" added !`)
            return newTag.id; 
        } catch (error) {
            throw new Error(500 + ": An unexpected error occured : tag creation");
        }
    }
}