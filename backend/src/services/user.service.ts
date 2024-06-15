import { prismaClient } from "../db/index.js";

export class UserService {
  async userExists(email: string) {
    return Boolean(await prismaClient.user.findFirst({ where: { email } }));
  }

  async createUser(email: string) {
    return Boolean(await prismaClient.user.findFirst({ where: { email } }));
  }
}
