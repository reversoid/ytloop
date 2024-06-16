import fastifySecureSession from "@fastify/secure-session";
import fp from "fastify-plugin";
import { ExtractJwt, Strategy as JWTStrategy } from "passport-jwt";
import fastifyPassport from "@fastify/passport";

export default fp(async (fastify) => {
  fastify.register(fastifySecureSession, {
    key: Buffer.allocUnsafe(32),
    cookieName: "access_token",
  });
  fastify.register(fastifyPassport.default.initialize());
  fastify.register(fastifyPassport.default.secureSession());

  fastifyPassport.default.use(
    "jwt",
    new JWTStrategy(
      {
        secretOrKey: "some-jwt-secret",
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      },
      async (x, done) => {
        if ("good") {
          return done(null, { user: "super" });
        }

        return done(null, false);
      }
    )
  );
});
