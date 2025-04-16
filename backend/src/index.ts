import "reflect-metadata"; 
import express from 'express'; 
import dataSource from "./config/db";
import cors from 'cors'; 
import { FindManyOptions } from "typeorm";

import Ad from "./entities/Ad";
import Category from "./entities/Category";
import Tag from "./entities/Tag";

//Port and express app
const port = 3000; 
const app = express(); 

app.use(cors());
app.use(express.json());

// SQLite DB and good_corner db init
// const db = new sqlite3.Database("good_corner.sqlite"); 

// ADS CRUD ! **********************************************************************************
// Get all ads from DB
app.get('/ads', async (req, res) => {
  try {
    let findOptions: FindManyOptions<Ad> = {
        relations: { 
          category : true, 
          tags: true,
        }, 
    }
    if (req.query.category !== undefined) {
      findOptions = {
        ...findOptions, 
        where : {
          category: {id:Number.parseInt(req.query.category as string)}, 
        },
      };
    }
    const allAds = await Ad.find(findOptions);
    res.send(allAds); 
  } catch (error) {
    res.status(500).send(error)
  }
})

//get a particular ads from DB 

app.get("/ads/:id", async (req, res) => {
  const result = await Ad.findOneByOrFail({
    id: Number.parseInt(req.params.id),
  });
  res.send(result);
});

// Post new add
app.post("/ads", async (req, res) => {
  try {
    const ad = new Ad(); 
    ad.title = req.body.title; 
    ad.description = req.body.description; 
    ad.owner = req.body.owner; 
    ad.price = req.body.price; 
    ad.picture = req.body.picture; 
    ad.location = req.body.location; 
    ad.createdAt = req.body.createdAt; 
    ad.category = req.body.category_id; 
    // console.log(req.body.tags)
    // if (req.body.tags) {
    //   ad.tags = req.body.tags.map((item:string) => ({id : Number.parseInt(item)}))
    // }
    
    await ad.save();
    res.status(201).send("New ad has been created !");
  } catch (error) {
    res.status(500).send(error)
  }
  
});

app.put("/ads/:id", async (req, res) => {
  try {
    const body = req.body; 
    const id = Number.parseInt(req.params.id); 

    await Ad.update({id :id}, body)
    await Category.update({},body)
    res.status(200).send(`Ad number ${req.params.id} has been updated !`)
  } catch (error) {
    res.status(500).send(error)
  }
})

app.delete("/ads/:id", async (req, res) => {
  try {
    await Ad.delete({id:Number.parseInt(req.params.id) });
    res.status(200).send(`Ad number ${req.params.id} has been deleted! `)
  } catch (error) {
    res.status(500).send(error); 
  }
 
})

// CATEGORIES CRUD ! **********************************************************************************
app.get("/categories", async (_req, res) => {
  try {
    const allCategories = await Category.find(); 
    res.send(allCategories)
  } catch (error) {
    res.status(500).send(error)
  }
})

app.post("/categories", async (req, res) => {
  try {
    const newCategory = new Category(); 
    String(req.body.title).charAt(0).toUpperCase() + String(req.body.title).slice(1);
    newCategory.title = req.body.title; 
    await newCategory.save(); 
    res.status(201).send(`The new category "${req.body.title}" has been added !`); 
  } catch (error) {
    res.status(500).send(error)
  }
})

// app.put("/categories/:id", async (req, res) => {
//   try {
//     const newTitle = req.body.title; 
//     const id = Number.parseInt(req.params.id); 

//     await Category.update({id :id}, newTitle); 
//     res.status(201).send(`Category ${req.body.title} has been updated !`)
//   } catch (error) {
//     res.status(500).send(error); 
//   }
// })

app.delete("/categories/:id", async (req, res) => {
  try {
    await Category.delete({id:Number.parseInt(req.params.id)}); 
    res.status(201).send(`Category with id ${req.params.id} has been deleted`); 
  } catch (error) {
    res.status(500).send(error)
  }

})

// TAGS CRUD ! ***************************************************************************************
app.get("/tags", async (_req, res) => {
  try {
    const allTags = await Tag.find() ; 
    res.status(201).send(allTags);
  } catch (error) {
    res.status(500).send(error)
  }
})

app.post("/tags", async (req, res) => {
  try {
    const newTag = new Tag(); 
    newTag.title = req.body.title; 
    console.log(newTag.title + req.body.title)
    await newTag.save(); 
    res.status(201).send(`The new tag "${req.body.title}" has been added !`)
  } catch (error) {
    res.status(500).send(error)
  }
  
})

// app.put("/tags/:id", async (req, res) => {
//   try {
//     const id = Number.parseInt(req.params.id);
//     const newTitle = req.body.title; 
//     console.log(newTitle, req.body.title, id) 

//     await Tag.update({id:id}, newTitle); 
//     res.status(201).send(`Tag ${req.body.title} has been updated !`)
//   } catch (error) {
//     res.status(500).send(error); 
//   }
// })

app.delete("/tags/:id", async (req, res) => {
  try {
    await Tag.delete({id:Number.parseInt(req.params.id)}); 
    res.status(201).send(`Tag with id ${req.params.id} has been deleted`); 
  } catch (error) {
    res.status(500).send(error)
  }

})

// APP LISTEN ! **********************************************************************************
app.listen(port, async () => {
  await dataSource.initialize(); 

  const categories = await Category.find()
  if (categories.length === 0) {
    const misc = new Category(); 
    misc.title = "Misc", 
    misc.save();
  }
  
  console.log(`Express app is listening on port ${port} :D`)
})
