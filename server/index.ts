// ESM
import Fastify from "fastify";
import cors from "@fastify/cors";

const origin = process.env.ORIGIN || "http://localhost:5173";

import {
  deleteNote,
  getNotes,
  handleLogin,
  registerUser,
  updateNotes,
  updateUsersTags,
} from "./routes.js";

const fastify = Fastify({
  logger: true,
});

fastify.register(cors, {
  origin: origin,
});
fastify.register(getNotes);
fastify.register(updateNotes);
fastify.register(deleteNote);
fastify.register(handleLogin);
fastify.register(registerUser);
fastify.register(updateUsersTags);

const SERVER_PORT = Number(process.env.PORT) || 3000;

fastify.listen({ port: SERVER_PORT, host: "0.0.0.0" }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  // console.log(`Server is now listening on ${address}`);
});
