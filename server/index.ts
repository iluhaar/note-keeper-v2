// ESM
import Fastify from "fastify";
import cors from "@fastify/cors";

import {
  deleteNote,
  getNotes,
  handleLogin,
  registerUser,
  updateNotes,
} from "./routes.js";

const fastify = Fastify({
  logger: true,
});

fastify.register(cors, {
  origin: "http://localhost:5173",
});
fastify.register(getNotes);
fastify.register(updateNotes);
fastify.register(deleteNote);
fastify.register(handleLogin);
fastify.register(registerUser);

const SERVER_PORT = Number(process.env.PORT) || 3000;

fastify.listen({ port: SERVER_PORT }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  // console.log(`Server is now listening on ${address}`);
});
