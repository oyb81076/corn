import { APP_KEYS } from "@corn/etc";
import Koa from "koa";
import koaBody from "koa-body";
import koaJson from "koa-json";
import koaLogger from "koa-logger";
import { getFileLogger } from "./logger";
import router from "./route";
const logger = getFileLogger(__filename);
const app = new Koa();
app.proxy = true;
app.keys = APP_KEYS;
// tslint:disable-next-line: no-var-requires
require("koa-onerror")(app);
app.use(koaLogger());
app.use(koaBody({
  json: true,
  multipart: true,
  parsedMethods: ["POST", "PUT", "PATCH"],
  text: false,
  urlencoded: false,
}));
app.use(koaJson({
  param: "pretty",
  pretty: process.env.NODE_ENV === "development",
  spaces: 2,
}));
app.use(router.routes());
app.use(router.allowedMethods());
app.on("error", (err) => {
  if (!err.status) {
    logger.error(err);
  }
});

export default app;
