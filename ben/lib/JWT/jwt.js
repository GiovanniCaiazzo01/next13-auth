import dotEnv from "dotenv";
import jwt from "jsonwebtoken";

dotEnv.config({ path: "./.env" });

const { JWT_SECRET } = process.env;

export const verifyJwt = async (jwtToken) => {
  try {
    return jwt.verify(jwtToken, JWT_SECRET, function (err, decoded) {
      if (err?.name === "TokenExpiredError") {
        return false;
      }
      return true;
    });
  } catch (error) {
    console.error(error);
  }
};

export const makeJwt = async (data) => {
  const { fullName, ucode, email } = data;
  try {
    return jwt.sign({ fullName, ucode, email }, JWT_SECRET, {
      expiresIn: "59s",
    });
  } catch (error) {
    console.error(error);
  }
};
