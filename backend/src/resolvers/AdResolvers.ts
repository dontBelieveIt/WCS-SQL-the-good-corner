// Importing necessary decorators and types from type-graphql and typeorm
import { Arg, Field, ID, InputType, Mutation, Query, Resolver } from "type-graphql";
import Ad from "../entities/Ad"; // Importing the Ad entity, which represents the ads in the database
import { FindManyOptions } from "typeorm"; // Importing options for querying the database
import Category from "../entities/Category";
import Tag from "../entities/Tag";
import CategoryResolver from "./CategoryResolvers";

// This resolver is part of the transition from a RESTful API to GraphQL.
// It handles GraphQL queries related to ads, which are similar to listings on platforms like Leboncoin or Craigslist.
@InputType()
class AdInput {

    @Field()
    title!: string;

    @Field()
    description!: string;

    @Field()
    owner!: string;

    @Field()
    price!: number;

    @Field()
    location!: string;

    @Field()
    picture!: string;

    @Field(() => ID)
    category!: Category;

    @Field(() => [ID])
    tags!: Tag[];
}

@Resolver(Ad) // Declaring this class as a GraphQL resolver for the Ad entity
export default class AdResolver {
    // GraphQL query to fetch all ads from the database
    @Query(() => [Ad]) // This query returns an array of Ad objects
    async getAllAds() {
        let findOptions: FindManyOptions<Ad> = {
            relations: { category: true, tags: true },
        };
        try {
            // Fetching all ads from the database using the defined options
        
            const allAds = await Ad.find(findOptions);
            return allAds;
        } catch (error) {
            // Logging any errors that occur during the query execution
            console.info(error);
        }
    }

    @Query(() => Ad)
    async getAd(@Arg("id") id: number) {
        const ad = await Ad.findOneByOrFail({ id }); 
        return ad; 
    }

    @Mutation(() => ID) // This mutation returns an Ad object
    async createAd(@Arg("data") data: AdInput) {
        const ad = Ad.create({
            ...data, 
            tags: data.tags.map((tag) => ({ id: Number(tag) })),
        });

        try {
            await ad.save();
            return ad.id;
        } catch (err) {
            console.error(err);
        }
    }

    @Mutation(() => ID)
    async updateAd(@Arg("id") id: number, @Arg("data") data: AdInput) {
        let ad = await Ad.findOneByOrFail({ id }); 
        ad = Object.assign(ad, data, {
            tags: data.tags.map((tag) => ({ id : Number(tag)})), 
        }); 
        await ad.save(); 
        return ad.id; 
    }

    @Mutation(() => ID)
    async DeleteDateColumn(@Arg("id") id: number) {
        await Ad.delete({ id }); 
        return id; 
    }
}
