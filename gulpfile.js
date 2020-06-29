"use strict";
const packageJson = require('./package.json');
const gulp = require("gulp");
const sass = require("gulp-sass");
const cleanCSS = require("gulp-clean-css");
const rename = require("gulp-rename");
const browserSync = require("browser-sync").create();
const npmDist = require("gulp-npm-dist");
const sourcemaps = require("gulp-sourcemaps");
const fileinclude = require("gulp-file-include");
const plumber = require("gulp-plumber");
const del = require('del');
const babel = require('gulp-babel');

//Build source

const filesToMove = [
    './lib/**/*.*',
    './assets/**/*.*',
    './template/**/*.*',
    './scss/**/*.*'
];

const moveSource = () => {
    return   gulp.src(filesToMove, { base: './' })
    .pipe(gulp.dest('dist'));
}


//Clean Dist folder
const clean = () => {
    return del('dist/**', {force:true});
}

const babelReactComponent = () => {
    return gulp.src("src/components/**/*.jsx")
    .pipe(babel({
        presets: ["@babel/preset-env", "@babel/preset-react"]
    }))
    .pipe(gulp.dest("./components"))
    .pipe(browserSync.reload({ stream: true }));
}

//Build HTML task

const buildHTMLTask = () => {
    return gulp
        .src(["src/**/*.html","!src/*.html","!lib/**/*.html","!assets/**/*.html"])
        .pipe(
            fileinclude({
                prefix: "@@",
                basepath: "@file",
                ignore: ["./src/modules"],
            })
        )
        .pipe(plumber())
        .pipe(gulp.dest("./template"))
        .pipe(browserSync.reload({ stream: true }));
};


//SASS task

const compileSass = () => {
    return gulp
        .src(["scss/custom.scss", "scss/dashforge.scss"])
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass().on("error", sass.logError))
        .pipe(cleanCSS())
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("assets/css"))
        .pipe(
            browserSync.reload({
                stream: true,
            })
        );
};

//Minify CSS

const compileSassMinify = () => {
    return gulp
        .src(["scss/custom.scss", "scss/dashforge.scss"])
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
        .pipe(cleanCSS())
        .pipe(rename({ suffix: ".min" }))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("assets/css"))
        .pipe(
            browserSync.reload({
                stream: true,
            })
        );
};

//Watch files

const watchFiles = () => {
    gulp.watch(
        ["scss/custom.scss", "scss/dashforge.scss"],
        gulp.parallel(compileSass)
    );

    // gulp.watch("src/*.html", buildHTMLTask);
    gulp.watch("src/**/*.html", buildHTMLTask);
    gulp.watch("src/components/**/*.jsx", babelReactComponent);
    gulp.watch("lib/**/*.js", reload);
    gulp.watch("./**/*.php", reload);
    //gulp.watch('template/**/*.html', reload);
    gulp.watch("components/**/*.html", reload);
    gulp.watch("collections/**/*.html", reload);
    gulp.watch("assets/js/*.js", reload);
};

//Browser Sync
const browserSyncReload = () => {
    browserSync.init({
         server: {
             baseDir:'./',
         },
        // proxy: "localhost:8888/zimdemo/",
        //  port:3006
    });
};

function reload(done) {
    browserSync.reload();
    done();
  }

// Copy dependencies to lib/

const copyPackage = () => {
    var modules = Object.keys(packageJson.dependencies);
  var moduleFiles = modules.map(function(module) {
    return 'node_modules/' + module + '/**/*.*';
  });
  return gulp.src(moduleFiles, { base: 'node_modules' })
    .pipe(gulp.dest('./lib'));
}

const copyLib = () => {
    return gulp
        .src(npmDist(), { base: "./node_modules/" })
        .pipe(plumber())
        .pipe(
            rename(function (path) {
                path.dirname = path.dirname
                    .replace(/\/dist/, "")
                    .replace(/\\dist/, "");
            })
        )
        .pipe(gulp.dest("lib"));
};

const build = gulp.series(clean,moveSource);
const watch = gulp.parallel(watchFiles, browserSyncReload);

exports.build = build;
exports.watch = watch;
exports.default = watch;
exports.copyPackage = copyPackage;