import { nanoid } from "nanoid";

export const createId = (length: number) => {
  return nanoid(length);
};
