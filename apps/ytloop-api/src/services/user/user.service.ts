import { User } from "../../models/user.js";
import { UserRepository } from "../../repositories/user/user.repository.js";
import { CreateUserDto, EditUserDto } from "./types.js";

export class UserService {
  private readonly userRepository: UserRepository;

  constructor({ userRepository }: { userRepository: UserRepository }) {
    this.userRepository = userRepository;
    console.log(typeof this.userRepository);
  }

  async createUser(dto: CreateUserDto): Promise<User> {
    return this.userRepository.createUser({
      email: dto.email,
      username: dto.username,
      password: dto.password,
    });
  }

  async editUser(userId: User["id"], dto: EditUserDto) {
    return this.userRepository.editUser(userId, dto);
  }

  async getUserById(userId: User["id"]) {
    return this.userRepository.getUserById(userId);
  }

  async UNSAFE_getUserByEmail(email: User["email"]) {
    return this.userRepository.UNSAFE_getUserByEmail(email);
  }

  async getUserByEmail(email: User["email"]) {
    return this.userRepository.getUserByEmail(email);
  }
}
