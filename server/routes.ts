import { update } from "firebase/database";
import { getData, updateData } from "./helpers/firebase";
import { request } from "http";

const mockedNotes = [
  {
    note: "# Summary \n## Functions: \n- add \n- edit\n- preview without editing\n- list node",
    id: " Summary -641784f3-dc9b-4797-8a2f-b0922a225a75",
  },
  {
    note: "# Feature dev\n\n1. Connect to DB\n2. update UI (needed as hell) \n3. to work on UX\n\n\n",
    id: "Feature dev-8fafab17-468d-46e5-afef-b981f6d54ee3",
  },
  {
    note: "# Hesitate\nskdjhaskdh ",
    id: "Hesitate-d535150a-9577-4246-94f1-96d2e994dbc1",
  },
];

export async function getNotes(fastify, options) {
  fastify.get("/notes", async (request, reply) => {
    reply.headers({
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers":
        "Origin, X-Requested-With, Content-Type, Accept",
      "Access-Control-Allow-Methods": "GET",
    });

    const data = await getData();

    return { notes: data };
  });
}

export async function updateNotes(fastify, options) {
  fastify.post("/note", async (request, reply) => {
    reply.headers({
      "Access-Control-Allow-Origin": "http://localhost:5173",
      "Access-Control-Allow-Headers":
        "Origin, X-Requested-With, Content-Type, Accept",
      "Access-Control-Allow-Methods": "POST",
    });

    try {
      await updateData(request.body);

      return { notes: request.body };
    } catch (error) {
      console.log("🚀 ~ fastify.post ~ error:", error);
    }
  });
}

export async function handleLogin(fastify, options) {
  fastify.post("/login", async (request, reply) => {
    reply.headers({
      "Access-Control-Allow-Origin": "http://localhost:5173",
      "Access-Control-Allow-Headers":
        "Origin, X-Requested-With, Content-Type, Accept",
      "Access-Control-Allow-Methods": "POST",
    });

    const { email } = request.body;

    if (email.includes("ilya")) {
      return { success: true };
    }

    return { success: false };
  });
}
