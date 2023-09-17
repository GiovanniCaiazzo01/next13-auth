"use server";
import * as jose from "jose";

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

// const verifyJWT = async (jwt: string) => {
//   const { JWT_SECRET } = process.env;
//   const secretKey = await jose.JWK.asKey(JWT_SECRET);
//   const data = await jose.jwtVerify(jwt, secretKey);
//   console.log(data);
// };

export { signJWT };
