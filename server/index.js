"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// ESM
var fastify_1 = require("fastify");
var cors_1 = require("@fastify/cors");
var origin = process.env.ORIGIN || "http://localhost:5173";
var routes_js_1 = require("./routes.js");
var fastify = (0, fastify_1.default)({
    logger: true,
});
fastify.register(cors_1.default, {
    origin: origin,
});
fastify.register(routes_js_1.getNotes);
fastify.register(routes_js_1.updateNotes);
fastify.register(routes_js_1.deleteNote);
fastify.register(routes_js_1.handleLogin);
fastify.register(routes_js_1.registerUser);
console.log(fastify, "🚀");
var SERVER_PORT = Number(process.env.PORT) || 3000;
fastify.listen({ port: SERVER_PORT, host: "0.0.0.0" }, function (err, address) {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
    // console.log(`Server is now listening on ${address}`);
});
