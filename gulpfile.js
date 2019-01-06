var gulp = require("gulp"),
	clean = require("gulp-clean"),
	cssmin = require("gulp-cssmin"),
	uglify = require("gulp-uglify"),
	htmlMin = require("gulp-htmlmin"),
	gulpSequence = require("gulp-sequence");

gulp.task("default", ["copy"], function(){
	gulp.start("sequence1");
});

//fazer copia de arquivos na pasta dist, após executar tarefa clean
gulp.task("copy", ["clean"], function(){
	return gulp.src("src/**/*")
		.pipe(gulp.dest("dist"));
});

//apagar pasta dist
gulp.task("clean", function(){
	return gulp.src("dist")
		.pipe(clean());
});

//minificar de css
gulp.task("min-css", function(){
	return gulp.src("dist/css/*.css")
		.pipe(cssmin())
		.pipe(gulp.dest("dist/css"));
});

//minificar de js
gulp.task("min-js", function(){
	return gulp.src("dist/js/*.js")
		.pipe(uglify())
		.pipe(gulp.dest("dist/js"));
});

//minifica html
gulp.task("html-min", function(){
	return gulp.src("dist/*.html")
	.pipe(htmlMin({
		collapseInlineTagWhitespace: true,
		collapseWhitespace: true,
		removeComments: true
	}))
	.pipe(gulp.dest("dist"));
});


gulp.task("sequence1", gulpSequence( ['min-css', 'min-js'], 'html-min') );