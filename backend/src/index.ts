import express from "express";
import cors from "cors";
import dataSource from "./config/db";
import Ad from "./entities/Ad";
import Category from "./entities/Category";
import Tag from "./entities/Tag";
import { FindManyOptions, ILike } from "typeorm";
const port = 3000;
const app = express();

app.use(express.json());
app.use(cors());

app.post("/ads", async (req, res) => {
  const ad = new Ad();
  ad.title = req.body.title;
  ad.description = req.body.description;
  ad.owner = req.body.owner;
  ad.price = req.body.price;
  ad.picture = req.body.picture;
  ad.location = req.body.location;
  ad.category = req.body.category;
  // ['1','2'] => [{id:1}, {id:2}]
  ad.tags = req.body.tags.map((el: string) => ({ id: Number.parseInt(el) }));
  try {
    await ad.save();
    res.status(201).send("ad has been created");
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

app.get("/ads", async (req, res) => {
  // /ads?category=1 => req.query.category = 1
  let findOptions: FindManyOptions<Ad> = {
    relations: { category: true, tags: true },
  };
  if (req.query.category !== undefined) {
    findOptions = {
      ...findOptions,
      where: {
        category: { id: Number.parseInt(req.query.category as string) },
      },
    };
  }
  if (req.query.search !== undefined) {
    console.log("search query", req.query.search);
    findOptions = {
      ...findOptions,
      where: { title: ILike(`%${req.query.search}%`) },
    };
  }
  const allAds = await Ad.find(findOptions);
  res.send(allAds);
});

app.get("/ads/:id", async (req, res) => {
  const result = await Ad.findOneByOrFail({
    id: Number.parseInt(req.params.id),
  });
  res.send(result);
});

app.delete("/ads/:id", async (req, res) => {
  try {
    await Ad.delete({ id: Number.parseInt(req.params.id) });
    res.send("Ad has been removed");
  } catch (err) {
    console.log("err", err);
    res.status(500).send(err);
  }
});

app.put("/ads/:id", async (req, res) => {
  try {
    const adIdToUpdate = Number.parseInt(req.params.id);
    console.log(adIdToUpdate);
    const adToUpdate = await Ad.findOneByOrFail({ id: adIdToUpdate });
    Ad.merge(adToUpdate, req.body);
    adToUpdate.tags = req.body.tags
      ? req.body.tags.map((el: string) => ({ id: Number.parseInt(el) }))
      : adToUpdate.tags;
    await adToUpdate.save();
    res.send("Ad has been updated");
  } catch (err) {
    console.log("err", err);
    res.status(500).send(err);
  }
});

app.post("/categories", async (req, res) => {
  const newCategory = new Category();
  newCategory.title = req.body.title;
  try {
    await newCategory.save();
    res.status(201).send("Category has been created");
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

app.get("/categories", async (_req, res) => {
  const categories = await Category.find();
  res.send(categories);
});

app.post("/tags", async (req, res) => {
  const newTag = new Tag();
  newTag.title = req.body.title;
  await newTag.save();
  res.status(201).send("Tag has been created");
});

app.get("/tags", async (_req, res) => {
  const tags = await Tag.find();
  res.send(tags);
});

app.listen(port, async () => {
  console.log(`Example app listening on port ${port}`);
  await dataSource.initialize();
  const categories = await Category.find();
  if (categories.length === 0) {
    const misc = new Category();
    misc.title = "misc";
    misc.save();
  }
});
