// ESM
import Fastify from "fastify";
import { getNotes, updateNotes } from "./routes.js";
import cors from "@fastify/cors";
/**
 * @type {import('fastify').FastifyInstance} Instance of Fastify
 */
const fastify = Fastify({
  logger: true,
});

fastify.register(cors, {
  origin: "http://localhost:5173",
});
fastify.register(getNotes);
fastify.register(updateNotes);

fastify.listen({ port: 3000 }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  // Server is now listening on ${address}
});