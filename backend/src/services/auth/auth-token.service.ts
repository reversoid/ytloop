import { User } from "../../models/user.js";
import { RedisClient } from "../../plugins/redis.js";
import jwt from "jsonwebtoken";

export class AuthTokenService {
  private readonly redisClient: RedisClient;

  constructor({ redisClient }: { redisClient: RedisClient }) {
    this.redisClient = redisClient;
  }

  generateTokenPair(userId: User["id"]) {
    const accessToken = jwt.sign({ userId }, "", { expiresIn: "6h" });
    const refreshToken = jwt.sign({ userId }, "", { expiresIn: "90d" });

    return { accessToken, refreshToken };
  }

  async isRefreshTokenValid(userId: User["id"], token: string) {
    return Boolean(
      await this.redisClient.sismember(this.getRedisKey(userId), token)
    );
  }

  /** Makes refresh token valid */
  async claimRefreshToken(userId: User["id"], token: string) {
    await this.redisClient.sadd(this.getRedisKey(userId), token);
  }

  /** Makes refresh token invalid */
  async revokeRefreshToken(userId: User["id"], token: string) {
    await this.redisClient.srem(this.getRedisKey(userId), token);
  }

  private getRedisKey(userId: User["id"]) {
    return `user:${userId}:tokens`;
  }
}
