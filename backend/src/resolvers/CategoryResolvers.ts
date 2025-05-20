import { Arg, Field, ID, InputType, Mutation, Query, Resolver } from "type-graphql";
import Category from "../entities/Category"; // Represents the Category entity in the database
import { FindManyOptions } from "typeorm"; // Provides options for database queries

// Input type for creating a new category in GraphQL
@InputType()
class CategoryInput {
    @Field()
    title!: string; // Title of the category
}

// Resolver for handling GraphQL queries and mutations related to categories
@Resolver(Category)
export default class CategoryResolver {
    // Query to fetch all categories from the database
    @Query(() => [Category])
    async getAllCategory() {
        let findOptions: FindManyOptions<Category> = {
            relations: { ads: true }, // Include related ads (join column)
        };
        try {
            const allCategories = await Category.find(findOptions); // Fetch categories with the specified options
            return allCategories; // Return the list of categories
        } catch (error) {
            throw new Error(500 + ": read categories"); // Throw an error if the query fails
        }
    }

    // Mutation to add a new category
    @Mutation(() => ID)
    async addNewCategory(@Arg("data") data: CategoryInput) {
        const newCategory = Category.create({
            ...data, // Spread the input data
        });
        try {
            await newCategory.save(); // Save the new category to the database
            console.info(200 + ` The new category "${data.title}" has been added !`); // Log success message
            return newCategory.id; // Return the ID of the created category
        } catch (error) {
            console.error(500 + `${error}`); // Log any errors
            throw new Error(500 + ": an unexpected error occurred when category creation"); // Throw an error if saving fails
        }
    }
}