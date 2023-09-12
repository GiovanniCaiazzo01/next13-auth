import { MongoClient, Db } from "mongodb";

let db: Db;
const connectDB = async () => {
  const { MONGODB_URI, MONGODB_NAME } = process.env;

  try {
    if (db) {
      console.log("there is already an instance of the db.");
      return db;
    }
    const client = await MongoClient.connect(MONGODB_URI as string);
    db = client.db(MONGODB_NAME);
    console.log(`🟢 Mongo db connected`);
    return db;
  } catch (error) {
    console.log("🔴 Db connection failed");
  }
};

export { connectDB, db };
