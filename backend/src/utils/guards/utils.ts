import { HookHandlerDoneFunction } from "fastify";

/** Passes forbidden error to done fn */
export const forbidden = (doneFn: HookHandlerDoneFunction) => {
  doneFn({
    code: "403",
    message: "FORBIDDEN",
    name: "IS_PROJECT_CREATOR",
    statusCode: 403,
  });
};
