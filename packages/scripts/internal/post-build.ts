import { readFileSync, writeFileSync } from "fs"
import { join } from "path";
import glob from "glob";
const pattern = join(__dirname, "../../../build/packages/*/package.json");
glob(pattern, (err, files) => {
  if (err) { throw err; }
  for (const filename of files) {
    const content: string = readFileSync(filename, { encoding: "utf8" });
    const packageJSON = JSON.parse(content);
    delete packageJSON.devDependencies;
    const main: string | undefined = packageJSON.main;
    if (main && main.endsWith(".ts")) {
      packageJSON.main = main.replace(/\.ts$/, ".js");
      writeFileSync(filename, JSON.stringify(packageJSON, null, 2));
    }
  }
});
