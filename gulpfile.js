var gulp    = require('gulp'),
    connect = require('gulp-connect'),
    pug     = require('gulp-pug'),
    sass    = require('gulp-sass'),
    rename  = require('gulp-rename'),
    plumber = require('gulp-plumber');
    
    
gulp.task('pug', function() {
    gulp.src('./src/pug/index.pug')
    .pipe(plumber())
    .pipe(pug())
    .pipe(gulp.dest('./build'))
    .pipe(connect.reload());
});

gulp.task('sass', function() {
    gulp.src('./src/sass/index.scss')
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(rename('style.css'))
    .pipe(gulp.dest('./build'))
    .pipe(connect.reload());
});

gulp.task('watch', function() {
    gulp.watch('./src/pug/**/*.pug', ['pug']);
    gulp.watch('./src/sass/**/*.scss', ['sass']);
});

gulp.task('server', function() {
    connect.server({
        root: 'build',
        livereload: true,
        port: 8000
    });
});

gulp.task('build', ['pug', 'sass']);
gulp.task('default', ['server', 'build', 'watch']);