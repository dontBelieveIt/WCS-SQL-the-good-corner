import { Query, Resolver } from "type-graphql";
import Category from "../entities/Category";

@Resolver(Category)
export default class CategoryResolver {
    @Query(() => [Category])
    async getAllCategory() {
        try {
            const allCategories = await Category.find();
            return allCategories
        } catch (error) {
            console.error(500 + `${error}`);
        }
    }

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
}