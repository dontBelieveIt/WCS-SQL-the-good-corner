import "reflect-metadata"; 
import express from 'express'; 
import sqlite3 from 'sqlite3';
import { dataSource } from "./config/db";

//Port and express app
const port = 3000; 
const app = express(); 

app.use(express.json());

// SQLite DB and good_corner db init
const db = new sqlite3.Database("good_corner.sqlite"); 

// Get ad from DB
// app.get('/ads', (req, res) => {
//   db.all("SELECT * FROM ad", (err, row) => {
//     res.send(row); 
//   })
// })

// Post new ad in DB
// app.post("/ads", (req, res) => {
//   try {
//     const { title, description, owner, price, picture, location, createdAt } = req.body; 
  
//     const stmt = db.prepare(
//     `INSERT INTO ad (
//     title, 
//     description, 
//     owner, 
//     price, 
//     picture, 
//     location, 
//     createdAt) 
    
//     VALUES (?, ?, ?, ?, ?, ?, ?)`); 
    
//     stmt.run([
//       title,
//       description,
//       owner,
//       price,
//       picture,
//       location,
//       createdAt
//     ]);
//   } catch (error) {
//     res.status(500); 
//   }
//   res.send("Ad has been posted !")
// });

// Delete ad based on id
// app.delete("/ads/:id", (req, res) => {
//   const stmt = db.prepare("DELETE FROM AD WHERE ID=?");
//   stmt.run([req.params.id], (err) => {
//     if (err) {
//       res.status(500).send(err);
//     } else {
//       res.send("ad has been deleted");
//     }
//   });
// });

// Edit ad based on id
// app.put("/ads/:id", (req, res) => {
//   console.log(req.params.id);
//   console.log(req.body);
//   const stmt = db.prepare(`UPDATE AD SET
//     TITLE=?,
//     DESCRIPTION=?,
//     OWNER=?,
//     PRICE=?,
//     CREATEDAT=?,
//     PICTURE=?,
//     LOCATION=?
//     WHERE ID=?
//   `);
//   stmt.run([
//     req.body.title,
//     req.body.description,
//     req.body.owner,
//     req.body.price,
//     req.body.createdAt,
//     req.body.picture,
//     req.body.location,
//     req.params.id,
//   ]);
//   res.send("ok");
// });

// App listen
app.listen(port, async () => {
  await dataSource.initialize(); 
    console.log(`Express app is listening on port ${port} :D`)
})
