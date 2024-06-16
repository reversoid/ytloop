import { PrismaClient } from "@prisma/client";
import { createIdGenerator } from "../../utils/create-id.js";
import { CreateUserDto, EditUserDto } from "./types.js";
import * as bcrypt from "bcrypt";
import { User, selectUser } from "../../models/user.js";

export class UserRepository {
  private readonly prismaClient: PrismaClient;

  private generateId = createIdGenerator("user");

  constructor({ prismaClient }: { prismaClient: PrismaClient }) {
    this.prismaClient = prismaClient;
  }

  async createUser(dto: CreateUserDto): Promise<User> {
    const id = this.generateId();
    const passwordHash = await bcrypt.hash(dto.password, 12);

    const user = await this.prismaClient.user.create({
      data: { id, email: dto.email, username: dto.username, passwordHash },
      select: selectUser,
    });

    return user;
  }

  async editUser(userId: User["id"], dto: EditUserDto): Promise<User> {
    const user = await this.prismaClient.user.update({
      where: { id: userId },
      data: { email: dto.email, username: dto.username },
      select: selectUser,
    });

    return user;
  }

  async getUserById(userId: User["id"]): Promise<User | null> {
    return await this.prismaClient.user.findFirst({
      where: { id: userId },
      select: selectUser,
    });
  }

  async UNSAFE_getUserByEmail(email: User["email"]) {
    return await this.prismaClient.user.findFirst({
      where: { email },
    });
  }
}
