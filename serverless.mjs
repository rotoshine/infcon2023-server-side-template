import Fastify from "fastify";
import FastifyStatic from "@fastify/static";
import FastifyView from "@fastify/view";
import ejs from "ejs";
import path from "path";
import { fileURLToPath } from "url";
import ky from "ky-universal";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

const PORT = process.env.PORT || 9999;
const END_POINT =
  process.env.END_POINT || "https://api.infcon2023.roto.codes/api";
const fastify = Fastify({
  logger: true,
  ignoreTrailingSlash: true,
});

fastify.register(FastifyStatic, {
  root: path.join(__dirname, "public"),
  prefix: "/public/",
});

fastify.register(FastifyView, {
  engine: {
    ejs,
  },
});

fastify.get("/", (req, reply) => {
  reply.view("/templates/index.ejs", { title: "인디뮤지션 사이트 " });
});

fastify.get("/musicians", async (req, reply) => {
  const musicians = await ky(`${END_POINT}/musicians`).json();
  return reply.view("/templates/musicians.ejs", {
    title: "인디뮤지션 사이트 ",
    musicians,
  });
});

fastify.get("/musicians/:slug", async (req, reply) => {
  const musician = await ky(`${END_POINT}/musicians/${req.params.slug}`).json();

  console.log(musician);
  return reply.view("/templates/musicianDetail.ejs", {
    title: `인디뮤지션 ${musician.name} 상세정보`,
    musician,
  });
});

export default async (req, res) => {
  await fastify.ready();
  fastify.server.emit("request", req, res);
};
