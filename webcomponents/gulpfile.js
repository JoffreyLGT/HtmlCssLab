var gulp = require("gulp");
var browserSync = require("browser-sync").create();

gulp.task("browser-sync", () => {
  browserSync.init({
    server: {
      baseDir: "./random-image"
    }
  });

  gulp
    .watch(["./*.html", "./css/*.css", "./*.js"])
    .on("change", browserSync.reload);
});
