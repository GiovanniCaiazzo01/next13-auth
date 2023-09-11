"use server";
import {
  checkMissingField,
  generateUID,
  getCurrentDate,
  hashString,
  signJWT,
} from "@/app/(authentication)/utils/server/utils";
import { addUser, getUserByName } from "../data-access/auth.repository";

type registerUser = {
  username: string;
  password: string;
};

export const register = async (user_credentials: registerUser) => {
  const { username, password } = user_credentials;

  const have_missing_field = await checkMissingField({ username, password });
  if (have_missing_field.result) {
    return {
      result: false,
      message: `Hey don't forget your '${have_missing_field.missing_field}' 👺.`,
    };
  }

  try {
    const user_already_exist = await getUserByName(username);
    if (user_already_exist.result) {
      return {
        result: false,
        message: "Sembra che questa username sia già in uso 👺.",
      };
    }
  } catch (error) {
    console.error(error);
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
  user_payload.ucode = await generateUID();
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
