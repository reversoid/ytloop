import _ky from "ky";

export const ky = _ky.create({
  prefixUrl: typeof window === "undefined" ? "http://127.0.0.1:3333" : "api/",
  credentials: "include",
});

export type ApiError = {
  message: string;
};
