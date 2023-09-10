"use server";

import * as jose from "jose";
export const doLogin = async (data: FormData): Promise<boolean> => {
  const username = data.get("username")?.valueOf();
  const userLen = username?.toLocaleString().length;
  const password = data.get("password")?.valueOf();
  const passwordLen = password?.toLocaleString().length;

  if (!username || userLen === 0 || !password || passwordLen === 0) {
    return false;
  }

  return true;
};

export const doRegister = async (data: FormData) => {
  const username = data.get("username")?.valueOf().toString();
  const password = data.get("password")?.valueOf().toString();
  const userLen = username?.toLocaleString().length;
  const passwordLen = password?.toLocaleString().length;

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

export const checkAuthParam = (param: string): boolean => {
  const LOGIN = "login";
  return param === LOGIN ? true : false;
};

export const signJWT = async () => {
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
