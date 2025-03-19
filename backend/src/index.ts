import express from 'express'; 

const port = 3000; 
const app = express(); 

app.use(express.json());

let ads = [
    {
      id: 1,
      title: "Bike to sell",
      description:
        "My bike is blue, working fine. I'm selling it because I've got a new one",
      owner: "bike.seller@gmail.com",
      price: 100,
      picture:
        "https://images.lecho.be/view?iid=dc:113129565&context=ONLINE&ratio=16/9&width=640&u=1508242455000",
      location: "Paris",
      createdAt: "2023-09-05T10:13:14.755Z",
    },
    {
      id: 2,
      title: "Car to sell",
      description:
        "My car is blue, working fine. I'm selling it because I've got a new one",
      owner: "car.seller@gmail.com",
      price: 10000,
      picture:
        "https://www.automobile-magazine.fr/asset/cms/34973/config/28294/apres-plusieurs-prototypes-la-bollore-bluecar-a-fini-par-devoiler-sa-version-definitive.jpg",
      location: "Paris",
      createdAt: "2023-10-05T10:14:15.922Z",
    },
  ];

app.get('/', (_req, res) => {
    res.send("Hello World!  from express")
})

app.get('/ads', (_req, res) => {
    res.send(ads)
})

app.post("/ads", (req, res) => {
    ads.push(req.body);
    console.log("A new add has been added !")
    res.send("Request received, check the backend terminal");
  });

app.put("/ads/:id", (req, res) => {
  ads = ads.map((ad) => {
    if (parseInt(req.params.id) !== ad.id) {
      return ad
    } else {
      console.log(req.body)
      return req.body
    }
  })
  res.send(`Add ${req.params.id} has been updated !`)
})

app.delete("/ads/:id", (req, res) => {
  ads = ads.filter((ad) => ad.id !== Number.parseInt(req.params.id));
  res.send("The ad was deleted");
});

app.listen(port, () => {
    console.log(`This is an express app listening on port ${port}`)
})
