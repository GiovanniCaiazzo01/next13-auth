"use server";
import { connectDB, db } from "../../../../../mongodb/db_connection";
const USERS = "users";
const addUser = async (user_data: {
  username: string;
  password: string;
  ucode: string;
  created_at: string;
  updated_at: string;
  jwt_token: string;
}): Promise<{
  result: boolean;
  data?: {} | undefined;
  message: string;
}> => {
  await connectDB();
  const user = await db.collection(USERS).insertOne({ ...user_data });
  if (!user) {
    throw new Error("db error");
  }
  return { result: true, message: "You are in, welcome ✨" };
};

const getUserByName = async (
  username: string
): Promise<{ result: boolean; data: {} | undefined }> => {
  await connectDB();

  const user = await db
    .collection(USERS)
    .findOne({ username }, { projection: { _id: 0, username: 1 } });

  if (!user) {
    return { result: false, data: undefined };
  }
  return { result: true, data: user };
};

export { addUser, getUserByName };
