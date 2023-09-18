import { IResponse, IUser } from "../../../interfaces";

const addUser = async (user_data) => {
  //   const user = await prisma.user.create({ data: { ...user_data } });
  const user = "";
  if (!user) return { result: false, message: "something went wrong" };

  return { result: true, message: "You are in, welcome ✨" };
};

const getUserEmail = async (email) => {
  //   const user = await prisma.user.findFirst({ where: { email } });
  const user = "";

  if (!user) {
    return { result: false, data: user };
  }

  return { result: true };
};

const getUserLoginEssentials = async (username) => {
  return { result: true, data: "user" };
};

export { addUser, getUserEmail, getUserLoginEssentials };
