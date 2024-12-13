import { User } from "../../models/user.js";

export type RegisterUserDto = {
  username: string;
  email: string;
  password: string;
};

export type LoginUserDto = {
  email: string;
  password: string;
};

export type LogoutUserDto = {
  sessionId: string;
};

export type RefreshDto = {
  userId: User["id"];
  refreshToken: string;
};
