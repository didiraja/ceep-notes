var gulp = require("gulp");
//requires...

gulp.task("clean", function() {
    return gulp.src("dist")
               .pipe(clean());
});
gulp.task("copy", ["clean"], function() {
    return gulp.src("src/**/*")
               .pipe(gulp.dest("dist"));
});
gulp.task("build-img", ["copy"], function() {
    gulp.src("dist/img/**/*")
        .pipe(imagemin())
        .pipe(gulp.dest("dist/img"));
});
// gulp.task("build-js", function() {
//     // gulp.src("dist/js/**/*.js")
//     gulp.src(["dist/js/jquery.js", "outros-arquivos.js..."])
//         .pipe(concat("all.js"))
//         .pipe(uglifly)
//         .pipe(gulp.dest("dist/js"));
// });
// gulp.task("build-html", function() {
//     gulp.src("dist/**/*.html")
//         .pipe(htmlReplace({
//             // envolver as tags script com
//             //<!-- build:js -->
//             //<!-- endbuild -->
//             js: "js/all.js"
//         }))
//         .pipe(gulp.dest("dist"));
// });
gulp.task("usemin", function() {
    gulp.src("dist/**/*.html")
        .pipe(usemin({
            // envolver as tags script com
            //<!-- build:js js/all.min.js -->
            //<!-- endbuild -->
            "js": [uglify],

            // envolver as tags link com
            //<!-- build:css css/all.min.css -->
            //<!-- endbuild -->
            "css": [cssmin]
        }))
        .pipe(gulp.dest("dist"))
});
gulp.task("build", ["copy"], function() {
    gulp.start("build-img", "usemin", "...");
});
gulp.task("watch", function(){
    watch("src/**/*", function(){
        gulp.start("build");
    });
});