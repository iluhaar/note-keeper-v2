"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// ESM
var fastify_1 = require("fastify");
var routes_js_1 = require("./routes.js");
var cors_1 = require("@fastify/cors");
/**
 * @type {import('fastify').FastifyInstance} Instance of Fastify
 */
var fastify = (0, fastify_1.default)({
    logger: true,
});
fastify.register(cors_1.default, {
    origin: "http://localhost:5173",
});
fastify.register(routes_js_1.getNotes);
fastify.register(routes_js_1.updateNotes);
fastify.register(routes_js_1.deleteNote);
fastify.listen({ port: 3000 }, function (err, address) {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
    // Server is now listening on ${address}
});
