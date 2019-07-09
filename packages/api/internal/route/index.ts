import KoaRouter from "koa-router";
const router = new KoaRouter();

router.get("/api/ttl", async (ctx) => {
  ctx.body = new Date().toISOString();
});

export default router;
