import gulp from "gulp";
import gulpJsonEditor from "gulp-json-editor";
import { desc } from "./utils";

export function rootPkg() {
  return gulp.src("package.json")
    .pipe(gulpJsonEditor(editor))
    .pipe(gulp.dest("build"));
}

export function packagesPkg() {
  return gulp
    .src("packages/**/package.json")
    .pipe(gulpJsonEditor(editor))
    .pipe(gulp.dest("build/packages"));
}

function editor(json: { devDependencies: object, main?: string, scripts?: object }) {
  delete json.devDependencies;
  delete json.scripts;
  if (json.main && json.main.endsWith(".ts")) {
    json.main = json.main.replace(/\.ts$/, ".js");
  }
  return json;
}
