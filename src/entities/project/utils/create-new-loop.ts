import { createId } from "@/shared/utils/create-id";
import { Loop } from "../model";

const createLoopId = () => createId(5);

export const createNewLoop = ({
  postfixNumber,
}: {
  postfixNumber: number;
}): Loop => {
  return { id: createLoopId(), name: `New Loop ${postfixNumber}` };
};
