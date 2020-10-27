const 
    gulp         = require('gulp'),
    sass         = require('gulp-sass'),
    browserify   = require('gulp-browserify'),
    rename       = require('gulp-rename');

let modules = ['skills']

gulp.task('default', () => {
    modules.map(m => {
        gulp.task(`${m}Styles`, () => {
            return gulp.src(`./cards/${m}/styles/*.scss`)
            .pipe(sass())
            .pipe(gulp.dest(`./cards/${m}/` ))
        })
        
        gulp.task(`${m}Scripts`, () => {
            return gulp.src(`./cards/${m}/scripts/*.js`)
            .pipe(browserify({ insertGlobals: true }))
            .pipe(rename('indexCompile.js'))
            .pipe(gulp.dest(`./cards/${m}/`))
        })
        
        gulp.watch(`./cards/${m}/styles/*.scss`, gulp.parallel(`${m}Styles`))
        gulp.watch(`./cards/${m}/scripts/*.js`, gulp.parallel(`${m}Scripts`))
        gulp.watch(`./cards/${m}/*.html`)
    })
});