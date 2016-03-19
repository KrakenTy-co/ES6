// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var compass = require('gulp-compass');

var babelify = require('babelify');
var tsify = require('tsify');
var browserify = require('browserify');
var watchify = require('watchify');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var ngAnnotate = require('gulp-ng-annotate');
var templateCache = require('gulp-angular-templatecache');
var runSequence = require('run-sequence');
var sourcemaps = require('gulp-sourcemaps');
var rimraf = require('gulp-rimraf');
var exec = require('gulp-exec');

var src = 'src';
var dest = 'public';

var target = 'app.js';
var output = 'app.js';

var typescript = false;

var doSourceMaps = true;
var doAnotate = false;

// compile + watch script
function buildScript(file, watch, final) {
    var props = {
        entries: [file],
        debug: doSourceMaps,
        cache: {},
        packageCache: {},
        fullPaths: watch
    };

    var bundler = browserify(props);
    if (typescript) {
        bundler.plugin(tsify, {
            module: "system",
            noImplicitAny: true
        });
    }
    if (watch) {
        bundler.plugin(watchify);
    }

    if (!typescript) {
        if (final == undefined || final == false) {
            bundler.transform(babelify, {
                presets: ["es2015"]
            });
        } else {
            bundler.transform(babelify, {
                presets: ["es2015"],
                plugins: ["transform-remove-console", "transform-remove-debugger"]
            });
        }
    }
    function bundle() {
        return bundler.bundle()
            .on('error', gutil.log.bind(gutil, 'Browserify Error'))
            .pipe(source(output))
            .pipe(gulp.dest(dest + '/lib'));
    }

    bundler.on('update', function () {
        bundle();
        gutil.log('Rebundle...');
    });

    bundler.on('log', gutil.log);

    return bundle();
}

gulp.task('transpile', function () {
    return buildScript(src + '/' + target, false, false);
});

gulp.task('transpile-watch', function () {
    return buildScript(src + '/' + target, true, false);
});

gulp.task('transpile-final', function () {
    return buildScript(src + '/' + target, false, true);
});

// Compile Our Sass
gulp.task('sass', function () {
    return gulp.src(src + '/sass/**/*.scss')
        .pipe(compass({
            config_file: 'config.rb',
            css: dest + '/css',
            sass: src + '/sass',
            image: dest + '/img',
            sourcemap: doSourceMaps
        })).on('error', function (err) {
            console.log("Error : " + err.message);
            this.emit('end');
        })
        .pipe(gulp.dest(dest + '/css'));
});

gulp.task('copy-root', function () {
    return gulp.src([src + '/root/*.html', src + '/root/*.xml', src + '/root/*.png', src + '/root/*.txt',
            src + '/root/*.ico', src + '/root/*.json', src + '/root/.htaccess', src + '/root/*/*.*'])
        .pipe(gulp.dest(dest));
});

gulp.task('copy-font', function () {
    return gulp.src(src + '/font/**/*')
        .pipe(gulp.dest(dest + '/font'));
});

gulp.task('copy-images', function () {
    return gulp.src(src + '/img/*')
        .pipe(gulp.dest(dest + '/img'));
});

gulp.task('copy-favicon', function () {
    return gulp.src(src + '/favicons/*')
        .pipe(gulp.dest(dest + '/favicons'));
});

gulp.task('template-cache', function () {
    return gulp.src(src + '/app/components/**/*tpl.html')
        .pipe(templateCache('templates.js', {
            standalone: true
        }))
        .pipe(gulp.dest(src + '/tpl'));
});

gulp.task('minify', function () {
    var result = gulp.src([dest + '/lib/app.js']);
    if (doSourceMaps) {
        result = result.pipe(sourcemaps.init({loadMaps: true}));
    }
    result = result.pipe(concat('app-all.js'));
    if (doAnotate) {
        result = result.pipe(ngAnnotate({
            sourceMap: doSourceMaps,
            add: true
        }));
    }
    result = result.pipe(uglify({
        mangle: false
    }));
    if (doSourceMaps) {
        result = result.pipe(sourcemaps.write());
    }
    return result.pipe(gulp.dest(dest + '/app'));
});

// Watch Files For Changes
gulp.task('watch', function () {
    gulp.watch(src + '/sass/**/*.scss', ['sass']);
    gulp.watch(src + '/app/**/*tpl.html', ['template-cache']);
    gulp.watch(src + '/root/*', ['copy-root']);
    gulp.watch(src + '/app/page/**/*.html', ['copy-page']);

    return buildScript(src + '/' + target, true, false);
});

gulp.task("modernizr-compile", function () {
    gulp.src('./**/**')
        .pipe(exec('./node_modules/modernizr/bin/modernizr -c modernizr-config.json -d ./' + src + '/app/vendor/modernizr/'));
});

gulp.task('init-dev', ['copy-font', 'copy-images', 'copy-favicon']);

gulp.task('copy-others', ['template-cache', 'copy-root', 'sass']);

gulp.task('develop', function () {
    runSequence('init-dev', 'copy-others', 'watch');
});

gulp.task('release', function () {
    doSourceMaps = false;
    doAnotate = true;
    runSequence('init-dev', 'transpile-final', 'copy-others', 'minify');
});

gulp.task('default', ['develop']);