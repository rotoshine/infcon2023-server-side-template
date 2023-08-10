import Fastify from "fastify";
import FastifyStatic from "@fastify/static";
import FastifyView from "@fastify/view";
import ejs from "ejs";
import path from "path";
import { fileURLToPath } from "url";
import ky from "ky-universal";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

const PORT = process.env.PORT || 9999;
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

fastify.register(import("./routes.mjs"));

fastify.listen({ port: PORT }, (err, address) => {
  if (err) throw err;
  console.log(`Server listening on ${address}`);
});
