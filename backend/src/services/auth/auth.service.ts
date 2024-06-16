import { UserService } from "../user/user.service.js";
import { AuthTokenService } from "./auth-token.service.js";

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

  login() {
    // find user;

    this.authTokenService.generateTokenPair("some-id");
    this.authTokenService.claimRefreshToken("some-id", "some token");
  }

  register() {
    this.userService.createUser();

    this.authTokenService.generateTokenPair("some-id");
    this.authTokenService.claimRefreshToken("some-id", "some token");
  }

  logout() {
    // find user
    this.authTokenService.revokeRefreshToken("some-id", "some token");
  }
}
