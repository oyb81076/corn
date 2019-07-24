import gulp from "gulp";
import { desc } from "./utils";

desc(copyPackagesSource, "拷贝packages中的文件");
export function copyPackagesSource() {
  return gulp.src([
    "./packages/**/*.ts",
    "!packages/fontend/**",
    "!**/__tests__/**",
  ], { cwd: ".", relative: true }).pipe(gulp.dest("build/packages"));
}

desc(copyRootFile, "拷贝根目录下所需文件到build");
export async function copyRootFile() {
  return gulp.src("tsconfig.prod.json").pipe(gulp.dest("build"));
}
