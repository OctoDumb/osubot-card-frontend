const { reload } = require('browser-sync');

const 
    gulp         = require('gulp'),
    sass         = require('gulp-sass'),
    browserify   = require('gulp-browserify'),
    rename       = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync  = require('browser-sync').create();

let modules = [
    'user',
    'beatmapset',
    'beatmap',
    'top',
    'recent',
]

gulp.task('default', () => {
    modules.map((m, i) => {
        gulp.task(`${m}Styles`, () => {
            return gulp.src(`./cards/${m}/styles/index.scss`)
            .pipe(sass())
            .pipe(autoprefixer())
            .pipe(gulp.dest(`./cards/${m}/` ))
        });
        
        gulp.task(`${m}Scripts`, () => {
            return gulp.src(`./cards/${m}/scripts/*.js`)
            .pipe(browserify({ insertGlobals: true }))
            .pipe(rename('indexCompile.js'))
            .pipe(gulp.dest(`./cards/${m}/`))
        });
        
        gulp.watch(`./cards/${m}/styles/*.scss`, gulp.parallel(`${m}Styles`));
        gulp.watch(`./cards/${m}/scripts/*.js`, gulp.parallel(`${m}Scripts`));
        gulp.watch(`./cards/${m}/*.html`);
    })
});

browserSync.init({
    port: 3000,
    server: {
        baseDir: `./cards/top`,           
    }
});