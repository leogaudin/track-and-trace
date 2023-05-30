import { MongoClient } from "mongodb";

const connectionString = process.env.STRING_URI || "";

const client = new MongoClient(connectionString);

let conn = await client.connect();

let db = conn.db("tnt");

export default db;
