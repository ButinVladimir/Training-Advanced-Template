var gulp     = require('gulp'),
    connect  = require('gulp-connect'),
    pug      = require('gulp-pug'),
    sass     = require('gulp-sass'),
    rename   = require('gulp-rename'),
    plumber  = require('gulp-plumber'),
    sassLint = require('gulp-sass-lint');

gulp.task('pug', function() {
    return gulp.src('./src/pug/index.pug')
    .pipe(plumber())
    .pipe(pug())
    .pipe(gulp.dest('./build'))
    .pipe(connect.reload());
});

gulp.task('sass', function() {
    return gulp.src('./src/sass/index.scss')
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(rename('style.css'))
    .pipe(gulp.dest('./build'))
    .pipe(connect.reload());
});

gulp.task('images', function() {
    return gulp.src('./src/images/**/*.png')
    .pipe(gulp.dest('./build/images'))
    .pipe(connect.reload());
});

gulp.task('watch', function() {
    gulp.watch('./src/pug/**/*.pug', ['pug']);
    gulp.watch('./src/sass/**/*.scss', ['sass']);
    gulp.watch('./src/images/**/*.png', ['images']);
});

gulp.task('server', function() {
    return connect.server({
        root: 'build',
        livereload: true,
        port: 8000
    });
});

gulp.task('scss-lint', function() {
    return gulp.src('./src/sass/**/*.scss')
        .pipe(sassLint({
            options: {
                formatter: 'stylish',
              },
            rules: {
                'no-url-domains': false,
                'no-url-protocols': false,
            }
        }))
        .pipe(sassLint.format())
        .pipe(sassLint.failOnError());
});

gulp.task('lint', ['scss-lint']);
gulp.task('build', ['pug', 'sass', 'images']);
gulp.task('default', ['build', 'server', 'watch']);