import {
  v4 as uuidv4,
  version as uuidVersion,
  validate as uuidValidate,
} from "uuid";

const generateUUID = async () => {
  const uuid = uuidv4();
  const isValidUuid = uuidValidate(uuid) && uuidVersion(uuid) === 4;

  if (!isValidUuid) {
    throw new Error("coul not create uuid");
  }

  return uuid;
};

export { generateUUID };
