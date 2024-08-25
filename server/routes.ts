import { FastifyInstance } from "fastify";

import {
  createUser,
  deleteData,
  editUserTags,
  getData,
  loginUser,
  updateData,
} from "./helpers/firebase";

export async function getNotes(fastify: FastifyInstance, _options: any) {
  fastify.get("/notes", async (request, reply) => {
    reply.headers({
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers":
        "Origin, X-Requested-With, Content-Type, Accept",
      "Access-Control-Allow-Methods": "GET",
    });

    try {
      const { userId } = request.query as any;

      const data = await getData(userId);

      return data;
    } catch (error) {
      console.log(error);
    }
  });
}

export async function updateNotes(fastify: FastifyInstance, _options: any) {
  fastify.post("/note", async (request, reply) => {
    reply.headers({
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers":
        "Origin, X-Requested-With, Content-Type, Accept",
      "Access-Control-Allow-Methods": "POST",
    });

    try {
      const requestBody = request.body as any;

      const { id: userId } = requestBody;

      await updateData(requestBody, userId);

      return { notes: requestBody };
    } catch (error) {
      console.log(error);
    }
  });
}

export async function deleteNote(fastify: FastifyInstance, _options: any) {
  fastify.delete("/delete-note", async (request, reply) => {
    reply.headers({
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers":
        "Origin, X-Requested-With, Content-Type, Accept",
      "Access-Control-Allow-Methods": "POST",
    });

    try {
      const requestBody = request.body as any;
      const { userId } = requestBody;

      await updateData(requestBody, userId);

      return { notes: request.body };
    } catch (error) {
      console.log(error);
    }
  });
}

export async function handleLogin(fastify: FastifyInstance, _options: any) {
  fastify.post("/login", async (request, reply) => {
    reply.headers({
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers":
        "Origin, X-Requested-With, Content-Type, Accept",
      "Access-Control-Allow-Methods": "POST",
    });

    try {
      const requestBody = request.body as any;
      const data = await loginUser(requestBody);
      if (data.success === false) {
        return reply.code(401).send(data);
      } else {
        return reply.send(data);
      }
    } catch (error) {
      return { success: false };
    }
  });
}

export async function registerUser(fastify: FastifyInstance, _options: any) {
  fastify.post("/register", async (request, reply) => {
    reply.headers({
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers":
        "Origin, X-Requested-With, Content-Type, Accept",
      "Access-Control-Allow-Methods": "POST",
    });

    try {
      const requestBody = request.body as any;
      const { email, password, name } = requestBody;
      const data: registerI = await createUser(email, password, name);

      if (data.success === false) {
        reply.code(409);
        return reply.send(data);
      } else {
        return reply.code(200).send(data);
      }
    } catch (error) {
      console.log("🚀 ~ fastify.post ~ error:", error);
      return { success: false };
    }
  });
}

export async function updateUsersTags(fastify: FastifyInstance, _options: any) {
  fastify.post("/user-tags", async (request, reply) => {
    reply.headers({
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers":
        "Origin, X-Requested-With, Content-Type, Accept",
      "Access-Control-Allow-Methods": "POST",
    });

    try {
      const requestBody = request.body as any;
      const { id: userId, tags } = requestBody;
      const data: any = await editUserTags(userId, tags);

      if (data.success === false) {
        reply.code(409);
        return reply.send(data);
      } else {
        return reply.code(200).send(data);
      }
    } catch (error) {
      console.log("🚀 ~ fastify.post ~ error:", error);
      return { success: false };
    }

  })
}

interface registerI {
  success: boolean;
  error: string | null;
  data: any;
}
