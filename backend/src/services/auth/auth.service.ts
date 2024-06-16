import { UserService } from "../user/user.service.js";
import { AuthTokenService } from "./auth-token.service.js";
import { NoUserException, WrongCredentialsException } from "./errors.js";
import { LoginUserDto, LogoutUserDto, RegisterUserDto } from "./types.js";
import * as bcrypt from "bcrypt";

export class AuthService {
  private readonly userService: UserService;
  private readonly authTokenService: AuthTokenService;

  constructor({
    userService,
    authTokenService,
  }: {
    userService: UserService;
    authTokenService: AuthTokenService;
  }) {
    this.userService = userService;
    this.authTokenService = authTokenService;
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

    const tokens = this.authTokenService.generateTokenPair(existingUser.id);
    await this.authTokenService.claimRefreshToken(
      existingUser.id,
      tokens.refreshToken
    );

    return tokens;
  }

  async register(dto: RegisterUserDto) {
    const user = await this.userService.createUser(dto);

    const tokens = this.authTokenService.generateTokenPair(user.id);
    await this.authTokenService.claimRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }

  async logout(dto: LogoutUserDto) {
    const user = await this.userService.getUserById(dto.userId);

    if (!user) {
      return;
    }

    await this.authTokenService.revokeRefreshToken(user.id, dto.refreshToken);
  }
}
