import "reflect-metadata"; 
import dataSource from "./config/db";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone"
import { buildSchema } from "type-graphql";
import AdResolver from "./resolvers/AdResolvers";
import CategoryResolver from "./resolvers/CategoryResolvers";

const port = 3000; 
async function startServer() {
  await dataSource.initialize(); 
  const schema = await buildSchema({resolvers: [AdResolver, CategoryResolver]});
  const apolloServer = new ApolloServer({schema})
  const { url } = await startStandaloneServer(apolloServer, {
    listen : { port},
  })
  console.log(`🚀 Apollo app is listening on port ${url}`)
}
startServer(); 

// ADS CRUD ! **********************************************************************************

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

// // CATEGORIES CRUD ! **********************************************************************************
// app.get("/categories", async (_req, res) => {
//   try {
//     const allCategories = await Category.find(); 
//     res.send(allCategories)
//   } catch (error) {
//     res.status(500).send(error)
//   }
// })

// app.post("/categories", async (req, res) => {
//   try {
//     const newCategory = new Category(); 
//     String(req.body.title).charAt(0).toUpperCase() + String(req.body.title).slice(1);
//     newCategory.title = req.body.title; 
//     await newCategory.save(); 
//     res.status(201).send(`The new category "${req.body.title}" has been added !`); 
//   } catch (error) {
//     res.status(500).send(error)
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

// APP LISTEN ! **********************************************************************************

