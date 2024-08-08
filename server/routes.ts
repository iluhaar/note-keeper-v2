import { FastifyInstance } from "fastify";

import {
  createUser,
  deleteData,
  getData,
  loginUser,
  updateData,
} from "./helpers/firebase";

export const mockedNotes = {
  notes: [
    {
      note: "# Shopping List\n## Items:\n- Milk\n- Bread\n- Eggs\n- Cheese",
      id: "Shopping List-641784f3-dc9b-4797-8a2f-b0922a225a75", // Replace with a unique ID generator
    },
    {
      note: "# Meeting Notes\n## Topics:\n- Project Update\n- Task Assignments\n- Next Steps",
      id: "Meeting Notes-641784f3-dc9b-4797-8a2f-b0922a225a75", // Replace with a unique ID generator
    },
    {
      note: "# Recipe\n## Ingredients:\n- Flour\n- Sugar\n- Butter\n## Instructions:\n1. Preheat oven\n2. Mix ingredients",
      id: "Recipe-641784f3-dc9b-4797-8a2f-b0922a225a75", // Replace with a unique ID generator
    },
    {
      note: "# Travel Itinerary\n## Days:\n- Day 1: Arrival\n- Day 2: Sightseeing\n- Day 3: Museum visit",
      id: "Travel Itinerary-641784f3-dc9b-4797-8a2f-b0922a225a75", // Replace with a unique ID generator
    },
    {
      note: "# Book Summary\n## Chapters:\n- Introduction\n- Chapter 1\n- Chapter 2",
      id: "Book Summary-641784f3-dc9b-4797-8a2f-b0922a225a75", // Replace with a unique ID generator
    },
    {
      note: "# Movie Review\n## Plot:\n- Brief summary\n## Characters:\n- Main characters\n## Review:\n- Overall opinion",
      id: "Movie Review-641784f3-dc9b-4797-8a2f-b0922a225a75", // Replace with a unique ID generator
    },
    {
      note: "# Study Notes\n## Topic:\n- Subject matter\n## Key Points:\n- Important information",
      id: "Study Notes-641784f3-dc9b-4797-8a2f-b0922a225a75", // Replace with a unique ID generator
    },
    {
      note: "# Task List\n## Tasks:\n- Task 1\n- Task 2\n- Task 3",
      id: "Task List-641784f3-dc9b-4797-8a2f-b0922a225a75", // Replace with a unique ID generator
    },
  ],
};

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

interface registerI {
  success: boolean;
  error: string | null;
  data: any;
}
