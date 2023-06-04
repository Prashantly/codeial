const gulp = require("gulp");

//converts sass to css
const sass = require("gulp-dart-sass");
//CSS minification tool that optimizes and compresses CSS code
const cssnano = require("gulp-cssnano");
var plumber = require("gulp-plumber");

//append content hashes to the filenames of assets (CSS, JS, images, etc.) during the build process. This is useful for cache-busting purposes.
const rev = require("gulp-rev");
const uglify = require("gulp-uglify-es").default;
const imagemin = require("gulp-imagemin");
const del = require("del");

gulp.task("css", function () {
  console.log("minifying css...");
  //** means any folder and every subfolder inside it and *.scss means every file with .scss
  return (
    gulp
      .src("./assets/sass/**/*.scss")
      .pipe(plumber()) // Add plumber to handle errors ---> good practice to handle errors during the build process to prevent Gulp from crashing and provide meaningful error messages
      .pipe(sass().on("error", sass.logError))
      .pipe(cssnano())
      .pipe(gulp.dest("./assets.css"))
      .pipe(gulp.src("./assets/**/*.css"))
      //gulp-rev also creates a manifest file(by default named rev-manifest.json)
      .pipe(rev())
      .pipe(gulp.dest("./public/assets")) //write rev'd assets to build dir
      .pipe(plumber())
      //maps the original filenames to their revised filenames. This manifest file is typically used by other build tools or server-side code to reference the updated asset filenames correctly.
      .pipe(
        rev.manifest({
          base: "./public/assets",
          merge: true,
        })
      )
      .pipe(gulp.dest("./public/assets"))
  );
});

gulp.task("js", function (done) {
  console.log("minifying js...");

  gulp
    .src("./assets/**/*.js")
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest("./public/assets")) //write rev'd assets to build dir
    .pipe(
      rev.manifest({
        base: "./public/assets",
        merge: true,
      })
    )
    .pipe(gulp.dest("./public/assets"));
  done();
});

gulp.task("images", function (done) {
  console.log("compressing images...");

  gulp
    .src("./assets/**/*.+(png|jpg|gif|svg|jpeg)")
    .pipe(imagemin())
    .pipe(rev())
    .pipe(gulp.dest("./public/assets")) //write rev'd assets to build dir
    .pipe(
      rev.manifest({
        base: "./public/assets",
        merge: true,
      })
    )
    .pipe(gulp.dest("./public/assets"));
  done();
});

gulp.task("clean:assets", function (done) {
  del.sync("./public/assets");
  del.sync("./rev-manifest.json");
  done();
});

gulp.task(
  "build",
  gulp.series("clean:assets", "css", "js", "images"),
  function (done) {
    console.log("Building assets");
    done();
  }
);
