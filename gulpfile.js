const { series, parallel, src, dest } = require('gulp'),
	clean = require("gulp-clean"),
	cssmin = require("gulp-cssmin"),
	uglify = require("gulp-uglify"),
	htmlMin = require("gulp-htmlmin"),
	postcss = require("gulp-postcss"),
	postcssPresetEnv = require("postcss-preset-env");


//fazer copia de arquivos na pasta dist, após executar tarefa clean
function copiar(){
	return src("src/**/*")
		.pipe(dest("dist"));
};

//apagar pasta dist
function limpar(){
	return src("dist", {force: true, read: false, allowEmpty: true})
		.pipe(clean());
};

//minificar de css
function minCss(){
	return src("dist/css/*.css")
		.pipe(cssmin())
		.pipe(dest("dist/css"));
};

//minificar de js
function minJs(){
	return src("dist/js/*.js")
		.pipe(uglify())
		.pipe(dest("dist/js"));
};

//minifica html
function minHtml(){
	return src("dist/*.html")
	.pipe(htmlMin({
		collapseInlineTagWhitespace: true,
		collapseWhitespace: true,
		removeComments: true
	}))
	.pipe(dest("dist"));
};

function convertCss() {
	return src("./dist/css/*.css")
	.pipe(postcss([
			postcssPresetEnv({stage: 3})
		]))
	.pipe(dest("dist/css"))
};
		

exports.default = series(limpar, copiar, convertCss, parallel(minCss, minJs), minHtml);