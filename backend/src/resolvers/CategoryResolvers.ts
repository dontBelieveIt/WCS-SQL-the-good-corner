import { Arg, Field, ID, InputType, Mutation, Query, Resolver } from "type-graphql";
import Category from "../entities/Category";
import { FindManyOptions } from "typeorm";

@InputType()
class CategoryInput {
    @Field()
    title!: string 
}

@Resolver(Category)
export default class CategoryResolver {
    @Query(() => [Category])
    async getAllCategory() {
        let findOptions: FindManyOptions<Category> = {
            relations: {ads: true}
        }
        try {
            const allCategories = await Category.find(findOptions);
            return allCategories
        } catch (error) {
            throw new Error(500 + ": read categories");
        }
    }

    @Mutation(() => ID)
    async addNewCategory(@Arg("data") data: CategoryInput) {
        const newCategory = Category.create({
            ...data
        }); 
    try {
        await newCategory.save(); 
        console.info(200 + ` The new category "${data.title}" has been added !`); 
        return newCategory.id; 
      } catch (error) {
       console.error(500+`${error}`)
       throw new Error(500 + ": an unexpected error occudred when category creation");
      }
    }
}