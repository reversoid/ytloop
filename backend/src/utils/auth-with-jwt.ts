import fastifyPassport from "@fastify/passport";

export const authWithJWT = () => {
  return fastifyPassport.default.authenticate("jwt", { authInfo: false });
};
