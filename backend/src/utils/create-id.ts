import { init } from "@paralleldrive/cuid2";

export const createIdGenerator = (fingerprint: string) =>
  init({ length: 10, fingerprint });
