import { ApiError } from "next/dist/server/api-utils";
import { ky as _ky } from "../uitls/ky";

const ky = _ky.extend({
  hooks: {
    afterResponse: [
      (req, options, res) => {
        return res;
      },

      async (req, options, res) => {
        return res;
      },
    ],
  },
});

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
