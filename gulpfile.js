var gulp = require("gulp");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var clean = require("gulp-clean-dest");

var getJSHandler = function() {
    return function() {
        var js = [
            "src/js/**/*.js",
            "!src/js/app.min.js",
            "!src/js/api/**/*.js"
        ];

        gulp.src(js)
            .pipe(concat("app.min.js"))
            .pipe(gulp.dest("build/js"))
            .pipe(gulp.dest("src/js"));

    }
};

var getHTMLHandler = function() {
    return function() {
        gulp.src([
            "src/index.html"
        ]).pipe(gulp.dest("build"));
    }
};

gulp.task("html", getHTMLHandler());

gulp.task("js", getJSHandler());
gulp.task("default", function(){
    gulp.run('js');
    gulp.run('html');
    gulp.watch("src/js/**/*.*", ["js"]);
    gulp.watch("src/**/*.html", ["html"]);
});