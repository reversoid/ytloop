import _ky from "ky";

export const ky = _ky.create({ prefixUrl: "http://localhost:3000/", json: {} });
