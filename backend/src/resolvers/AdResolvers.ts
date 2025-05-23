// Importing necessary decorators and types from type-graphql and typeorm
import { Arg, Field, ID, InputType, Mutation, Query, Resolver } from "type-graphql";
import Ad from "../entities/Ad"; // Represents the Ad entity in the database
import { FindManyOptions } from "typeorm"; // Provides options for database queries
import Category from "../entities/Category"; // Represents categories associated with ads
import Tag from "../entities/Tag"; // Represents tags associated with ads

// Input type for creating or updating ads in GraphQL
@InputType()
class AdInput {
    @Field() title!: string; // Title of the ad
    @Field() description!: string; // Description of the ad
    @Field() owner!: string; // Owner of the ad
    @Field() price!: number; // Price of the item in the ad
    @Field() location!: string; // Location of the item
    @Field() picture!: string; // URL or path to the ad's picture
    @Field(() => ID) category!: Category; // Category of the ad
    @Field(() => [ID]) tags!: Tag[]; // Tags associated with the ad
}

// Resolver for handling GraphQL queries and mutations related to ads
@Resolver(Ad)
export default class AdResolver {
    // Query to fetch all ads from the database
    @Query(() => [Ad])
    async getAllAds() {
        let findOptions: FindManyOptions<Ad> = {
            relations: { category: true, tags: true }, // Include related categories and tags (join column (category) and join-table (tags))
        };
        try {
            const allAds = await Ad.find(findOptions); // Fetch ads with the specified options
            return allAds; // Return the list of ads
        } catch (error) {
            console.info(error); // Log any errors
        }
    }

    // Query to fetch a single ad by its ID
    @Query(() => Ad)
    async getAd(@Arg("id") id: number) {
        const ad = await Ad.findOneByOrFail({ id }); // Find the ad or throw an error if not found
        return ad; // Return the ad
    }

    // Mutation to create a new ad
    @Mutation(() => ID)
    async createAd(@Arg("data") data: AdInput) {
        const ad = Ad.create({
            ...data, // Spread the input data
            tags: data.tags.map((tag) => ({ id: Number(tag) })), // Map tag IDs to tag objects
        });

        try {
            await ad.save(); // Save the new ad to the database
            return ad.id; // Return the ID of the created ad
        } catch (err) {
            console.error(err); // Log any errors
        }
    }

    // Mutation to update an existing ad
    @Mutation(() => ID)
    async updateAd(@Arg("id") id: number, @Arg("data") data: AdInput) {
        let ad = await Ad.findOneByOrFail({ id }); // Find the ad to update by its id (if id === parameter.id )
        ad = Object.assign(ad, data, {
            tags: data.tags.map((tag) => ({ id: Number(tag) })), // Update tags [{"id" : "1"}, {"id" : "2"}]
        });
        await ad.save(); // Save the updated ad
        return ad.id; // Return the ID of the updated ad
    }

    // Mutation to delete an ad by its ID
    @Mutation(() => ID)
    async deleteAd(@Arg("id") id: number) {
        await Ad.delete({ id }); // Delete the ad from the database
        return id; // Return the ID of the deleted ad
    }
}
