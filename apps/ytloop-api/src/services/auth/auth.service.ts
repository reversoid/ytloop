import { Lucia } from "lucia";
import { UserService } from "../user/user.service.js";
import {
  NoUserException,
  UserAlreadyExtistsException,
  WrongCredentialsException,
} from "./errors.js";
import { LoginUserDto, LogoutUserDto, RegisterUserDto } from "./types.js";
import * as bcrypt from "bcrypt";

export class AuthService {
  private readonly userService: UserService;
  private readonly lucia: Lucia;

  constructor({
    userService,
    lucia,
  }: {
    userService: UserService;
    lucia: Lucia;
  }) {
    this.userService = userService;
    this.lucia = lucia;
  }

  async login(dto: LoginUserDto) {
    const existingUser = await this.userService.UNSAFE_getUserByEmail(
      dto.email
    );

    if (!existingUser) {
      throw new NoUserException();
    }

    const passwordsAreEqual = await bcrypt.compare(
      dto.password,
      existingUser.passwordHash
    );

    if (!passwordsAreEqual) {
      throw new WrongCredentialsException();
    }

    const session = await this.lucia.createSession(existingUser.id, {});

    return { sessionId: session.id };
  }

  async register(dto: RegisterUserDto) {
    const existingUser = await this.userService.getUserByEmail(dto.email);

    if (existingUser) {
      throw new UserAlreadyExtistsException();
    }

    const user = await this.userService.createUser({
      email: dto.email,
      username: dto.username,
      password: dto.password,
    });

    const session = await this.lucia.createSession(user.id, {});

    return { sessionId: session.id };
  }

  async logout(dto: LogoutUserDto) {
    await this.lucia.invalidateSession(dto.sessionId);
  }
}
