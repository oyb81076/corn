import gulp from "gulp";
import { clean } from "./scripts/gulp/clean";
import { copyPackagesSource, copyRootFile } from "./scripts/gulp/copy";
import { packagesPkg, rootPkg } from "./scripts/gulp/pkg";
import { tsc } from "./scripts/gulp/tsc";
gulp.task("clean", clean);
gulp.task("build", gulp.series(
  clean,
  copyPackagesSource,
  copyRootFile,
  packagesPkg,
  rootPkg,
  tsc,
));
