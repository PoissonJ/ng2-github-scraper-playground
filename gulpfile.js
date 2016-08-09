var gulp = require('gulp');

var browserSync = require('browser-sync');
var reload = browserSync.reload;
var nodemon = require('gulp-nodemon');

var gulpTypescript = require('gulp-typescript');
var gulpSourcemaps = require('gulp-sourcemaps');

var del = require('del');

var appDev = 'assets/app';
var appProd = 'public/js/app';
var vendor = 'public/js/vendor';

var tsconfig = gulpTypescript.createProject('tsconfig.json');

gulp.task('browser-sync', function() {
    browserSync.init(null, {
        proxy: "http://localhost:3000", // port of node server
        port: 7000
        // files: ["./public/**/*.*"]
    });
});

gulp.task('nodemon', function (cb) {
// gulp.task('nodemon', function (cb) {
    var callbackCalled = false;
    return nodemon({script: './bin/www'}).on('start', function () {
        if (!callbackCalled) {
            callbackCalled = true;
            cb();
        }
    });
});

gulp.task('build-ts', function() {
  return gulp.src(appDev + '/**/*.ts') // load all ts files
    .pipe(gulpSourcemaps.init()) // inits source maps
    .pipe(gulpTypescript(tsconfig)) // compile ts files
    .pipe(gulpSourcemaps.write())  // must be after ts compilation
    .pipe(gulp.dest(appProd)); // where to write the compiled ts files to
});

gulp.task('build-copy', function() {
  return gulp.src([appDev + '/**/*.html', appDev + '/**/*.htm', appDev + '/**/*.css']) // load all css and html files
    .pipe(gulp.dest(appProd)); // Move to specified folder
});

gulp.task('clean', function() {
  del(appProd + '/**/*');
});

gulp.task('vendor', function() {
  gulp.src('node_modules/@angular/**') // load all angular files
    .pipe(gulp.dest(vendor + '/@angular')); // Move to specified folder

  gulp.src('node_modules/core-js/**')
    .pipe(gulp.dest(vendor + '/core-js'));

  gulp.src('node_modules/reflect-metadata/**')
    .pipe(gulp.dest(vendor + '/reflect-metadata/'));

  gulp.src('node_modules/rxjs/**')
    .pipe(gulp.dest(vendor + '/rxjs/'));

  gulp.src('node_modules/systemjs/**')
    .pipe(gulp.dest(vendor + '/systemjs/'));

  gulp.src('node_modules/ng2-bootstrap/**')
    .pipe(gulp.dest(vendor + '/ng2-bootstrap/'));

  gulp.src('node_modules/moment/**')
    .pipe(gulp.dest(vendor + '/moment/'));

  gulp.src('node_modules/zone.js/**')
    .pipe(gulp.dest(vendor + '/zone.js/'));

  gulp.src('node_modules/cheerio/**')
    .pipe(gulp.dest(vendor + '/cheerio/'));
});

gulp.task('watch', function() {
  gulp.watch(appDev + '/**/*.ts', ['build-ts']).on('change', reload) // compile ts when it's changed
  gulp.watch(appDev + '/**/*.{html, htm, css}', ['build-copy']).on('change', reload);
});

// gulp.task('default', ['watch', 'build-ts', 'build-copy', 'vendor', 'browser-sync']);
gulp.task('default', ['clean', 'watch', 'build-ts','build-copy','vendor','browser-sync']);
gulp.task('build', ['build-ts', 'build-copy', 'vendor']);
