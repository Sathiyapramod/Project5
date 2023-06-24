//start of code

import express from "express";
import { MongoClient } from "mongodb";
const app = express();

const PORT = 4000;

const MONGO_URL = "mongodb://127.0.0.1";
const client = new MongoClient(MONGO_URL); //dialing operation
await client.connect(); //This is a calling operation

app.get("/", (request, response) => {
  response.send({ message: "Welcome to Home Page" });
});

app.get("/output", async (req, res) => {
  const users = await client.db("demo").collection("users").insertMany([
    {
      _id: 1,
      name: "John Doe",
      city: "San Francisco",
    },
    {
      _id: 2,
      name: "Jane Doe",
      city: "New York City",
    }]
  );
  const cities = await client.db("demo").collection("cities").insertMany([
    {
      _id: "San Francisco",
      name: "San Francisco",
      state: "California",
    },
    {
      _id: "New York City",
      name: "New York City",
      state: "New York",
    }]
  );

  const final = await client
    .db("demo")
    .collection("users")
    .aggregate([
      {
        $match: {
          city: {
            $in: ["San Francisco", "New York City"],
          },
        },
      }
    ]).toArray();
    console.log(final)
});

app.listen(PORT, () =>
  console.log(`The Server is running on the port : ${PORT} 😉`)
);

//end of code
