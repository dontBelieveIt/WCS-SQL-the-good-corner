// Importing necessary decorators and types from type-graphql and typeorm
import { Arg, Field, ID, InputType, Mutation, Query, Resolver } from "type-graphql";
import Ad from "../entities/Ad"; // Importing the Ad entity, which represents the ads in the database
import { FindManyOptions } from "typeorm"; // Importing options for querying the database
import Category from "../entities/Category";
import Tag from "../entities/Tag";

// This resolver is part of the transition from a RESTful API to GraphQL.
// It handles GraphQL queries related to ads, which are similar to listings on platforms like Leboncoin or Craigslist.
@InputType()
class AdInput {
    @Field()
    id!: string; 

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
    category!: Category

    @Field(() => ID)
    tags!: Tag[]
}

@Resolver(Ad) // Declaring this class as a GraphQL resolver for the Ad entity
export default class AdResolver {
    // GraphQL query to fetch all ads from the database
    @Query(() => [Ad]) // This query returns an array of Ad objects
    async getAllAds() {
        try {
            // Defining options for the database query
            // Relations specify that the 'category' and 'tags' fields should be fetched along with the ads
            let findOptions: FindManyOptions<Ad> = {
                relations: { category: true, tags: true },
            };

            // The following commented-out code represents logic that was used in the RESTful API
            // It demonstrates how query parameters like 'category' and 'search' were handled in the REST API.
            // These would need to be adapted for GraphQL if similar filtering is required.

            // Example: Filtering ads by category
            // if (req.query.category !== undefined) {
            //   findOptions = {
            //     ...findOptions,
            //     where: {
            //       category: { id: Number.parseInt(req.query.category as string) },
            //     },
            //   };
            // }

            // Example: Searching ads by title
            // if (req.query.search !== undefined) {
            //   console.log("search query", req.query.search);
            //   findOptions = {
            //     ...findOptions,
            //     where: { title: ILike(`%${req.query.search}%`) },
            //   };
            // }

            // Fetching all ads from the database using the defined options
            const allAds = await Ad.find(findOptions);

            // Returning the fetched ads to the GraphQL client
            return allAds;
        } catch (error) {
            // Logging any errors that occur during the query execution
            console.info(error);
        }
    }

    @Mutation(() => Ad) // This mutation returns an Ad object
    async createAd(@Arg("data") data: AdInput) {
        const ad = new Ad;

        ad.title = data.title;
        ad.description = data.description;
        ad.owner = data.owner;
        ad.price = data.price;
        ad.picture = data.picture;
        ad.location = data.location;
        ad.category = data.category;
        // ['1','2'] => [{id:1}, {id:2}]
        //ad.tags = data.tags.map((tag) => ({ id: tag.id }));
        try {
            await ad.save();
            return ad;
        } catch (err) {
            console.error(err);
            return ad;
        }
    }

    @Mutation(() => Ad)
    async deleteAd(@Arg("data") data: AdInput) {
        try {
            await Ad.delete({id:Number.parseInt(data.id) });
            console.info(`Ad number ${data.id} has been deleted! `)
          } catch (error) {
            console.error(500 + " : " + error); 
          }
    }
}
