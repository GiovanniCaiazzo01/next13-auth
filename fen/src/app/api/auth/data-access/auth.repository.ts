"use server";
import { IResponse, IUser } from "@/app/interfaces";
import { prisma } from "@/db";

const addUser = async (user_data: IUser): Promise<IResponse> => {
  const user = await prisma.user.create({ data: { ...user_data } });
  if (!user) return { result: false, message: "something went wrong" };

  return { result: true, message: "You are in, welcome ✨" };
};

const getUserEmail = async (email: string): Promise<IResponse> => {
  const user = await prisma.user.findFirst({ where: { email } });
  if (!user) {
    return { result: false, data: user };
  }

  return { result: true };
};

const getUserLoginEssentials = async (username: string) => {
  return { result: true, data: "user" };
};

export { addUser, getUserEmail, getUserLoginEssentials };
