// Importing necessary decorators and types from type-graphql and typeorm
import { Query, Resolver } from "type-graphql";
import Ad from "../entities/Ad"; // Importing the Ad entity, which represents the ads in the database
import { FindManyOptions } from "typeorm"; // Importing options for querying the database

// This resolver is part of the transition from a RESTful API to GraphQL.
// It handles GraphQL queries related to ads, which are similar to listings on platforms like Leboncoin or Craigslist.

@Resolver(Ad) // Declaring this class as a GraphQL resolver for the Ad entity
class AdResolver {
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
}