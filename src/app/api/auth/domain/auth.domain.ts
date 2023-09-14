"use server";

import {
  addUser,
  getUserLoginEssentials,
  getUserUsername,
} from "../data-access/auth.repository";
import { getCurrentDate, checkMissingField } from "@/lib/UTILS/utils";
import { hashString, decryptBcrypt } from "@/lib/BCRYPT/bcrypt";
import { generateUUID } from "@/lib/UUID/uuid";
import { signJWT } from "@/lib/JOSE/jose";

type UserCredentials = {
  username: string;
  password: string;
};

export const register = async (user_credentials: UserCredentials) => {
  const { username, password } = user_credentials;

  const have_missing_field = await checkMissingField({ username, password });
  if (have_missing_field.result) {
    return {
      result: false,
      message: `Hey don't forget your '${have_missing_field.missing_field}' 👺.`,
    };
  }

  try {
    const user_already_exist = await getUserUsername(username);
    if (user_already_exist.result) {
      return {
        result: false,
        message: "Sembra che questa username sia già in uso 👺.",
      };
    }
  } catch (error) {
    console.error("è qui che si verifica l'errore ?", error);
  }

  let user_payload = {
    username,
    password,
    ucode: "",
    created_at: "",
    updated_at: "",
    jwt_token: "",
  };
  user_payload.password = await hashString(password);
  user_payload.ucode = await generateUUID();
  user_payload.created_at = await getCurrentDate();
  user_payload.updated_at = await getCurrentDate();
  user_payload.jwt_token = await signJWT();

  try {
    const new_user = await addUser(user_payload);
    new_user && { result: new_user.result, message: new_user.message };
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
