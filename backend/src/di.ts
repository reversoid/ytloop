import {
  diContainer, // this is an alias for diContainerProxy
  diContainerClassic, // this instance will be used for `injectionMode = 'CLASSIC'`
  diContainerProxy, // this instance will be used by default
} from "@fastify/awilix";
import { asFunction, asClass, asValue } from "awilix";

// Code from the previous example goes here
