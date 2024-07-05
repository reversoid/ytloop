import { ky } from "../uitls/ky";

type LoginDto = {
  email: string;
  password: string;
};

type RegisterDto = {
  username: string;
  email: string;
  password: string;
};

export const login = (dto: LoginDto) =>
  ky.post("auth/login", { json: dto }).json<void>();

export const register = (dto: RegisterDto) =>
  ky.post("auth/register", { json: dto }).json<void>();

export const logout = () => ky.post("auth/register").json<void>();
