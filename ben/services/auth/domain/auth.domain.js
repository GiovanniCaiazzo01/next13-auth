import { hashString } from "../../../lib/BCRYPT/bcrypt";
import { checkMissingField, getCurrentDate } from "../../../lib/UTILS/utils";
import { generateUUID } from "../../../lib/UUID/uuid";
import { addUser, getUserEmail } from "../data-access/auth.repository";

export const register = async (user_credentials) => {
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

  let user_payload = {
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
