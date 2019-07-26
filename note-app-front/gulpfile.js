var gulp = require("gulp");
var browserSync = require("browser-sync").create();

gulp.task("browser-sync", () => {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });

  gulp
    .watch(["./*.html", "./*.css", "./*.js"])
    .on("change", browserSync.reload);
});
