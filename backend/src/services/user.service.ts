import { prismaClient } from "../db/index.js";

export class UserService {
  createUser() {}

  async userExists(email: string) {
    return Boolean(await prismaClient.user.findFirst({ where: { email } }));
  }
}
