import { MongoClient } from "mongodb";
import credentials from "../credentials.json";

export default class Database {
  constructor() {
    MongoClient.connect(credentials.mongopath, {
      useUnifiedTopology: true,
    }).then((client) => {
      console.log("Connected to Database");
      const db = client.db("crypt-me");
      const coll = db.collection("regs");
      coll
        .insertOne({ nombre: "Rodrigo" })
        .then((result) => {
          console.log(result);
        })
        .catch((error) => console.error(error));
    });
  }
}
