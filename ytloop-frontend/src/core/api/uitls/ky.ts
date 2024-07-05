import _ky from "ky";

export const ky = _ky.create({ prefixUrl: "http://127.0.0.1:3000/", json: {} });
