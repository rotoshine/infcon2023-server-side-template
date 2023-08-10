const END_POINT =
  process.env.END_POINT || "https://api.infcon2023.roto.codes/api";

export default async function routes(fastify, options) {
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
    const musician = await ky(
      `${END_POINT}/musicians/${req.params.slug}`,
    ).json();

    console.log(musician);
    return reply.view("/templates/musicianDetail.ejs", {
      title: `인디뮤지션 ${musician.name} 상세정보`,
      musician,
    });
  });
}
