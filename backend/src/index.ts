import "reflect-metadata"; 
import express from 'express'; 
import sqlite3 from 'sqlite3';
import { dataSource } from "./config/db";
import Ads from "./entities/Ads";
import Categories from "./entities/Categories";
import Tags from "./entities/Tags";

//Port and express app
const port = 3000; 
const app = express(); 

app.use(express.json());

// SQLite DB and good_corner db init
// const db = new sqlite3.Database("good_corner.sqlite"); 

// ADS CRUD ! **********************************************************************************
// Get ad from DB
app.get('/ads', async (_req, res) => {
  try {
    const allAds = await Ads.find({
      relations: {
        category: true,
        tag : true 
      },
    });
    res.send(allAds); 
  } catch (error) {
    res.status(500).send(error)
  }
})

// Post new add
app.post("/ads", async (req, res) => {
  try {
    const ad = new Ads(); 
    ad.title = req.body.title; 
    ad.description = req.body.description; 
    ad.owner = req.body.owner; 
    ad.price = req.body.price; 
    ad.picture = req.body.picture; 
    ad.location = req.body.location; 
    ad.createdAt = req.body.createdAt; 
    ad.category = req.body.category_id; 

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

    await Ads.update({id :id}, body)
    await Categories.update({},body)
    res.status(200).send(`Ad number ${req.params.id} has been updated !`)
  } catch (error) {
    res.status(500).send(error)
  }
})

app.delete("/ads/:id", async (req, res) => {
  try {
    await Ads.delete({id:Number.parseInt(req.params.id) });
    res.status(200).send(`Ad number ${req.params.id} has been deleted! `)
  } catch (error) {
    res.status(500).send(error); 
  }
 
})

// CATEGORIES CRUD ! **********************************************************************************
app.get("/categories", async (_req, res) => {
  try {
    const allCategories = await Categories.find(); 
    res.send(allCategories)
  } catch (error) {
    res.status(500).send(error)
  }
})

// TAGS CRUD ! ***************************************************************************************
app.get("/tags", async (_req, res) => {
  try {
    const allTags = await Tags.find() ; 
    res.status(201).send(allTags);
  } catch (error) {
    res.status(500).send(error)
  }
})

app.post("/tags", async (req, res) => {
  try {
    const newTag = new Tags(); 
    newTag.title = req.body.title; 
    await newTag.save(); 
    res.status(201).send(`The new tag "${req.body.title}" has been added !`)
  } catch (error) {
    res.status(500).send(error)
  }
  
})

// APP LISTEN ! **********************************************************************************
app.listen(port, async () => {
  await dataSource.initialize(); 

  const categories = await Categories.find()
  if (categories.length === 0) {
    const misc = new Categories(); 
    misc.title = "Misc", 
    misc.save();
  }
  
  console.log(`Express app is listening on port ${port} :D`)
})
