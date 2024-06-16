import { UserRepository } from "./user.repository.js";

export class UserService {
  private readonly userRepository: UserRepository;

  constructor({ userRepository }: { userRepository: UserRepository }) {
    this.userRepository = userRepository;
  }

  async userExists() {}

  async createUser() {}

  async editUser() {}
}
