import "reflect-metadata"; 
import dataSource from "./config/db";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone"
import { buildSchema } from "type-graphql";
import AdResolver from "./resolvers/AdResolvers";
import CategoryResolver from "./resolvers/CategoryResolvers";
import TagResolver from "./resolvers/TagResolvers";
import Category from "./entities/Category";

const port = 3000; 
async function startServer() {
  await dataSource.initialize(); 
  // const categories = await Category.find();
  // if (categories.length === 0) {
  //   console.log("categories'list :" + categories.length)
  //   const misc = new Category();
  //   misc.title = "misc";
  //   misc.save();
  // } else {
  //   console.info("categories has been loaded ?")
  // }
  const schema = await buildSchema({resolvers: [CategoryResolver, AdResolver, TagResolver]});
  const apolloServer = new ApolloServer({schema})
  const { url } = await startStandaloneServer(apolloServer, {
    listen : { port},
  })
  console.log(`🚀 Apollo app is listening on port ${url}`)
}
startServer(); 

// ADS CRUD ! **********************************************************************************
// Defining options for the database query
            // Relations specify that the 'category' and 'tags' fields should be fetched along with the ads

            // The following commented-out code represents logic that was used in the RESTful API
            // It demonstrates how query parameters like 'category' and 'search' were handled in the REST API.
            // These would need to be adapted for GraphQL if similar filtering is required.

            // Example: Filtering ads by category
            // if () {
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
// git all ads has been moved to ./resolver/AdResolver
// Post new add has been moved to ./resolver/AdResolver
// app.put("/ads/:id", async (req, res) => {
//   try {
//     const body = req.body; 
//     const id = Number.parseInt(req.params.id); 

//     await Ad.update({id :id}, body)
//     await Category.update({},body)
//     res.status(200).send(`Ad number ${req.params.id} has been updated !`)
//   } catch (error) {
//     res.status(500).send(error)
//   }
// })

// app.delete("/ads/:id", async (req, res) => {
//   try {
//     await Ad.delete({id:Number.parseInt(req.params.id) });
//     res.status(200).send(`Ad number ${req.params.id} has been deleted! `)
//   } catch (error) {
//     res.status(500).send(error); 
//   }
 
// })

// app.delete("/categories/:id", async (req, res) => {
//   try {
//     await Category.delete({id:Number.parseInt(req.params.id)}); 
//     res.status(201).send(`Category with id ${req.params.id} has been deleted`); 
//   } catch (error) {
//     res.status(500).send(error)
//   }

// })

// // TAGS CRUD ! ***************************************************************************************
// app.get("/tags", async (_req, res) => {
//   try {
//     const allTags = await Tag.find() ; 
//     res.status(201).send(allTags);
//   } catch (error) {
//     res.status(500).send(error)
//   }
// })

// app.post("/tags", async (req, res) => {
//   try {
//     const newTag = new Tag(); 
//     newTag.title = req.body.title; 
//     console.log(newTag.title + req.body.title)
//     await newTag.save(); 
//     res.status(201).send(`The new tag "${req.body.title}" has been added !`)
//   } catch (error) {
//     res.status(500).send(error)
//   }
  
// })

// app.delete("/tags/:id", async (req, res) => {
//   try {
//     await Tag.delete({id:Number.parseInt(req.params.id)}); 
//     res.status(201).send(`Tag with id ${req.params.id} has been deleted`); 
//   } catch (error) {
//     res.status(500).send(error)
//   }

// })

