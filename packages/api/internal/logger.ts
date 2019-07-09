import { Configuration, configure, getLogger } from "log4js";
const devOpts: Configuration = {
  appenders: { std: { type: "console" } },
  categories: { default: { appenders: ["std"], level: "all" } },
};
const prodOpts: Configuration = {
  appenders: {
    console_error: { type: "stderr", layout: { type: "basic" } },
    console_out: { type: "stdout", layout: { type: "basic" } },
    error_filter: { type: "logLevelFilter", appender: "console_error", level: "warn" },
  },
  categories: {
    default: { appenders: ["console_out", "error_filter"], level: "all" },
  },
  pm2: true,
};

configure(process.env.NODE_ENV === "production" ? prodOpts : devOpts);
export const getFileLogger = (filename: string) => {
  return getLogger(filename.substring(__dirname.length + 1, filename.length - 3));
};
