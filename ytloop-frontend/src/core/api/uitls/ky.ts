import _ky from "ky";

export const ky = _ky.create({
  prefixUrl: "api/",
  json: {},
  credentials: "include",
});

export type ApiError = {
  message: string;
};
