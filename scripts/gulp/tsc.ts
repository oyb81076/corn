import gulp from "gulp";
import { desc } from "./utils";
// tslint:disable-next-line: no-var-requires
const exec = require("gulp-exec");

desc(tsc, "tsc build");
export function tsc() {
  return gulp
    .src("build/tsconfig.prod.json")
    .pipe(exec("npx tsc -p build/tsconfig.prod.json"))
    .pipe(gulp.dest("build"));
}
