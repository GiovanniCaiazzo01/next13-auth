"use server";

import { prisma } from "@/db";

const USERS = "users";
const addUser = async (user_data: {
  ucode: string;
  username: string;
  email?: string | undefined;
  password: string;
  created_at: string;
  edited_at: string;
  jwt_token: string;
}): Promise<{
  result: boolean;
  data?: {} | undefined;
  message: string;
}> => {
  return { result: true, message: "You are in, welcome ✨" };
};

const getUserUsername = async (
  username: string
): Promise<{ result: boolean; data: {} | undefined }> => {
  return { result: true, data: "user" };
};

const getUserLoginEssentials = async (username: string) => {
  return { result: true, data: "user" };
};

export { addUser, getUserUsername, getUserLoginEssentials };
