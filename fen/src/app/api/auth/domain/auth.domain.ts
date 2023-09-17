"use server";

import {
  addUser,
  getUserEmail,
  getUserLoginEssentials,
} from "../data-access/auth.repository";
import { getCurrentDate, checkMissingField } from "@/lib/UTILS/utils";
import { hashString, decryptBcrypt } from "@/lib/BCRYPT/bcrypt";
import { generateUUID } from "@/lib/UUID/uuid";
import { signJWT } from "@/lib/JOSE/jose";
import { IUser } from "@/app/interfaces";

type UserCredentials = {
  username: string;
  email: string;
  password: string;
};

export const register = async (user_credentials: UserCredentials) => {
  const { username, email, password } = user_credentials;

  const have_missing_field = await checkMissingField({
    username,
    email,
    password,
  });

  if (have_missing_field.result) {
    return {
      result: false,
      message: `Hey don't forget your '${have_missing_field.missing_field}' 👺.`,
    };
  }

  try {
    const user_already_exist = await getUserEmail(email);
    if (user_already_exist.result) {
      return {
        result: false,
        message: "Sembra che questa email sia già in uso 👺.",
      };
    }
  } catch (error) {
    console.error(error);
  }

  let user_payload: IUser = {
    username,
    password,
    email,
    ucode: "",
    edited_at: "",
    created_at: "",
    jwt_token: "",
  };
  user_payload.password = await hashString(password);
  user_payload.ucode = await generateUUID();
  user_payload.edited_at = await getCurrentDate();
  user_payload.created_at = await getCurrentDate();
  user_payload.jwt_token = await signJWT();

  try {
    const new_user = await addUser(user_payload);
    new_user.result && { result: new_user.result, message: new_user.message };
  } catch (error) {
    console.error(error);
  }
};

export const login = async (user_credentials: UserCredentials) => {
  const { username, password } = user_credentials;
  const have_missing_field = await checkMissingField({ username, password });
  if (have_missing_field.result) {
    return {
      result: false,
      message: `Hey don't forget your '${have_missing_field.missing_field}' 👺.`,
    };
  }

  try {
    const user = await getUserLoginEssentials(username);

    console.log(user);

    // if (username === data?.username) {
    //   console.log("sono entrato ?");

    //   return { result: false, message: "Credenziali errate" };
    // }

    // console.log("non dovrei esser qui");

    // const isCorrectpassword = await decryptBcrypt(password, data?.password);
    // !isCorrectpassword && { result: false, message: "Credenziali errate" };

    // return { result: true, message: "welcome" };
  } catch (error) {
    console.log(error);
  }
};
