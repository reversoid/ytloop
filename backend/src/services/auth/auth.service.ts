import { UserService } from "../user/user.service.js";

export class AuthService {
  private readonly userService: UserService;

  constructor({ userService }: { userService: UserService }) {
    this.userService = userService;
    console.log(this.userService);
  }
}
