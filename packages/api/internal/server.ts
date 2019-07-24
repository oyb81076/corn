import { createServer } from "http";
import { API_PORT } from "shared/etc";
import app from "./app";
import { connect } from "./db";
import { getFileLogger } from "./logger";
const server = createServer(app.callback());
const logger = getFileLogger(__filename);
export function startup() {
  server.on("listening", () => {
    logger.info("Listening on %o", server.address());
  });
  server.on("error", (error: any) => {
    if (error.syscall === "listen") {
      if (error.code === "EACCES") {
        logger.error("%o requires elevated privileges", server.address());
        process.exit(1);
      } else if (error.code === "EADDRINUSE") {
        logger.error("%o is already in use", server.address());
        process.exit(1);
      }
    }
    throw error;
  });
  connect().then(() => {
    server.listen(API_PORT, "0.0.0.0");
  }, (error: Error) => {
    logger.error(error);
    process.exit(2);
  });
}
