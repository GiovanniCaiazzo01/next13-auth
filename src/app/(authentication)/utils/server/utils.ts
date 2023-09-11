"use server";

import * as jose from "jose";
import bcrypt from "bcrypt";
import {
  v4 as uuidv4,
  version as uuidVersion,
  validate as uuidValidate,
} from "uuid";

const doLogin = async (data: FormData): Promise<boolean> => {
  const username = data.get("username")?.valueOf();
  const userLen = username?.toLocaleString().length;
  const password = data.get("password")?.valueOf();
  const passwordLen = password?.toLocaleString().length;

  if (!username || userLen === 0 || !password || passwordLen === 0) {
    return false;
  }

  return true;
};

const doRegister = async (data: FormData) => {
  const username = data.get("username")?.valueOf().toString();
  const password = data.get("password")?.valueOf().toString();

  // const userLen = username?.toLocaleString().length;
  // const passwordLen = password?.toLocaleString().length;
  // if (!userLen || userLen === 0 || !passwordLen || passwordLen === 0) {
  //   throw new Error("cosa");
  // }

  const payload = {
    username,
    password,
  };

  try {
    const response = await fetch("/api/auth/entry-point", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};

const checkAuthParam = async (param: string): Promise<boolean> => {
  const LOGIN = "login";
  return param === LOGIN ? true : false;
};

const signJWT = async (): Promise<string> => {
  const { JWT_SECRET, JWT_ALG } = process.env;
  const secret = new TextEncoder().encode(JWT_SECRET);
  const alg = JWT_ALG as string;

  const jwt = await new jose.SignJWT({ "urn:example:claim": true })
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setIssuer("urn:example:issuer")
    .setAudience("urn:example:audience")
    .setExpirationTime("2h")
    .sign(secret);

  return jwt;
};

const checkMissingField = async (fields: {
  [key: string]: string | number;
}) => {
  for (const field in fields) {
    if (!fields[field]) return { result: true, missing_field: field };
  }
  return { result: false, missing_field: "" };
};

const hashString = async (string: string): Promise<string> => {
  const { BCRYPT_SALT_ROUND } = process.env;
  const salt = parseInt(BCRYPT_SALT_ROUND as string);
  if (!(string || salt)) {
    throw new Error("cannot hash without string ");
  }
  const hashedString = await bcrypt.hash(string, salt);
  return hashedString;
};

const generateUID = async (): Promise<string> => {
  const uuid = uuidv4();
  const isValidUuid = uuidValidate(uuid) && uuidVersion(uuid) === 4;

  if (!isValidUuid) {
    throw new Error("coul not create uuid");
  }
  return uuid;
};

const getCurrentDate = async (): Promise<string> => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");

  const dateString = `${year}-${month}-${day}`;
  return dateString;
};
export {
  doLogin,
  doRegister,
  checkAuthParam,
  signJWT,
  checkMissingField,
  hashString,
  generateUID,
  getCurrentDate,
};
