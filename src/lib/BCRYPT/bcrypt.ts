import bcrypt from "bcrypt";
const hashString = async (string: string): Promise<string> => {
  const { BCRYPT_SALT_ROUND } = process.env;
  const salt = parseInt(BCRYPT_SALT_ROUND as string);
  if (!(string || salt)) {
    throw new Error("cannot hash without string ");
  }
  const hashedString = await bcrypt.hash(string, salt);
  return hashedString;
};

const decryptBcrypt = async (incomingString: string, hashedString: string) => {
  if (!(incomingString && hashedString)) {
    throw new Error(
      `Missing or Invalid input, incomingString => ${incomingString}  and hashedString => ${hashedString} are required`
    );
  }
  const isValid = await bcrypt.compare(incomingString, hashedString);
  return isValid;
};

export { hashString, decryptBcrypt };
