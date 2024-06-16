import AutoLoad, { AutoloadPluginOptions } from "@fastify/autoload";
import { fastifyAwilixPlugin } from "@fastify/awilix";
import { FastifyPluginAsync } from "fastify";
import * as path from "path";
import { fileURLToPath } from "url";
import { initDI } from "./di.js";
import { ExtractJwt, Strategy as JWTStrategy } from "passport-jwt";
import fastifyPassport from "@fastify/passport";
import fastifySecureSession from "@fastify/secure-session";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export type AppOptions = {
  // Place your custom options for app below here.
} & Partial<AutoloadPluginOptions>;

// Pass --options via CLI arguments in command to enable these options.
const options: AppOptions = {};

const app: FastifyPluginAsync<AppOptions> = async (
  fastify,
  opts
): Promise<void> => {
  /** DI setup */
  fastify.register(fastifyAwilixPlugin, {
    disposeOnClose: true,
    disposeOnResponse: true,
    strictBooleanEnforced: true,
  });
  initDI();

  /** Passport setup */
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

  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  void fastify.register(AutoLoad, {
    dir: path.join(__dirname, "plugins"),
    options: opts,
    forceESM: true,
  });

  // This loads all plugins defined in routes
  // define your routes in one of these
  void fastify.register(AutoLoad, {
    dir: path.join(__dirname, "routes"),
    options: opts,
    forceESM: true,
  });
};

export default app;
export { app, options };
