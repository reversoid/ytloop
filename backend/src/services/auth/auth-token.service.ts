export class AuthTokenService {
  generateTokenPair(userId: string) {
    return { accessToken: "", refreshToken: "" };
  }

  /** Makes refresh token valid */
  async claimRefreshToken(userId: string, token: string) {}

  /** Makes refresh token invalid */
  async revokeRefreshToken(userId: string, token: string) {}
}
