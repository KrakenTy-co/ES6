// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var compass = require('gulp-compass');

var babelify = require('babelify');
var browserify = require('browserify');
//var tsify = require('tsify');
var watchify = require('watchify');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var ngAnnotate = require('gulp-ng-annotate');
var templateCache = require('gulp-angular-templatecache');
var gettext = require('gulp-angular-gettext');
var runSequence = require('run-sequence');
var sourcemaps = require('gulp-sourcemaps');
var rev = require('gulp-rev');
var revReplace = require("gulp-rev-replace");
var rimraf = require('gulp-rimraf');
var exec = require('gulp-exec');

var path = 'public/public/crossuite2/';

var doSourceMaps = true;
var doAnotate = false;
var getTextModule = 'crossuite2';

function buildScript(file, watch, final) {
    var props = {
        entries: [file],
        debug: doSourceMaps,
        cache: {},
        packageCache: {},
        fullPaths: watch
    };

    var bundler = browserify(props);
    if (watch) {
        bundler.plugin(watchify);
    }

    if (final == undefined || final == false) {
        bundler.transform(babelify, {
            presets: ["es2015"]
        });
    } else {
        bundler.transform(babelify, {
            presets: ["es2015"],
            plugins: ["transform-runtime", "transform-remove-console"]
        });
    }
    function bundle() {
        return bundler.bundle()
            .on('error', gutil.log.bind(gutil, 'Browserify Error'))
            .pipe(source('app.js'))
            .pipe(gulp.dest(path + 'lib'));
    }

    bundler.on('update', function () {
        bundle();
        gutil.log('Rebundle...');
    });

    bundler.on('log', gutil.log);

    return bundle();
}

gulp.task('transpile', function () {
    return buildScript('src/app.js', false, false);
});

gulp.task('transpile-watch', function () {
    return buildScript('src/app.js', true, false);
});

gulp.task('transpile-final', function () {
    return buildScript('src/app.js', false, true);
});

/*

 gulp.task('tsifypile', function() {
 return browserify({
 entries: 'src/app.js',
 debug: true
 })
 .transform(tsify)
 .bundle()
 .on("error", function (err) {
 console.log("Error : " + err.message);
 })
 .pipe(source('app.js'))
 .pipe(gulp.dest(path+'lib'));
 /!*.on('end', function(){
 console.log('Done transpile');
 });*!/
 });

 gulp.task('tspile', function() {
 return gulp.src('src/!**!/!*.ts')
 .pipe(sourcemaps.init())
 .pipe(ts({
 sortOutput: true,
 declaration: true,
 noExternalResolve: true
 }))
 .pipe(concat('app.js'))
 .pipe(sourcemaps.write())
 .pipe(gulp.dest(path+'lib'));
 });*/

// Compile Our Sass
gulp.task('sass', function () {
    return gulp.src('src/sass/**/*.scss')
        .pipe(compass({
            config_file: 'config.rb',
            css: path + 'css',
            sass: 'src/sass',
            image: path + 'img',
            sourcemap: doSourceMaps
        })).on('error', function (err) {
            console.log("Error : " + err.message);
            this.emit('end');
        })
        .pipe(gulp.dest(path + 'css'));
});


gulp.task('vendor', function () {
    var list = [];
    list = list.concat(['src/app/vendor/perfect-scrollbar/perfect-scrollbar.js']);
    list = list.concat([
        'node_modules/angular/**/angular.js',
        'node_modules/angular-animate/**/angular-animate.js',
        'node_modules/angular-aria/**/angular-aria.js',
        'node_modules/angular-touch/**/angular-touch.js',
        //'node_modules/@angular/**/angular1/angular_1_router.js',
        //'node_modules/@angular/**/angular1/ng_route_shim.js',
        'node_modules/angular-new-router/**/router.es5.js'
    ]);

    list = list.concat([
        'node_modules/angular-gettext/**/angular-gettext.js',
        'node_modules/angular-cookies/**/angular-cookies.js',
        'node_modules/angular-sanitize/**/angular-sanitize.js',
        'node_modules/angular-mocks/**/angular-mocks.js'
    ]);

    list = list.concat([
        'src/app/vendor/qr-code/qrcode.js',
        'src/app/vendor/fileSaver/FileSever.js',
        'src/app/vendor/blob/Blob.js',
        'src/app/vendor/ics/ics.js',
        'src/app/vendor/modernizr/modernizr.js',
        'src/app/vendor/smart-table/smart-table.js',
        'src/app/vendor/smart-table/lrStickyHeader.js'
    ]);

    list = list.concat([
        'src/app/vendor/jQRangeSlider/jQRuler.js',
        'src/app/vendor/jQRangeSlider/jQRangeSliderMouseTouch.js',
        'src/app/vendor/jQRangeSlider/jQRangeSliderDraggable.js',
        'src/app/vendor/jQRangeSlider/jQRangeSlider.js',
        'src/app/vendor/jQRangeSlider/jQRangeSliderHandle.js',
        'src/app/vendor/jQRangeSlider/jQRangeSliderBar.js',
        'src/app/vendor/jQRangeSlider/jQRangeSliderLabel.js',
        'src/app/vendor/jQRangeSlider/jQDateRangeSlider.js',
        'src/app/vendor/jQRangeSlider/jQDateRangeSliderHandle.js'
    ]);

    var result = gulp.src(list);

    if (doSourceMaps) {
        result = result.pipe(sourcemaps.init());
    }
    result = result.pipe(concat('vendor.js'));
    if (doSourceMaps) {
        result = result.pipe(sourcemaps.write());
    }
    return result.pipe(gulp.dest(path + 'lib'));
});

gulp.task('copy-cdn', function () {
    return gulp.src(['src/app/vendor/ckeditor/**/*', '!src/app/vendor/ckeditor/ng-*.js', '!src/app/vendor/ckeditor/angular-*.js'])
        .pipe(gulp.dest(path + 'lib'));
});

gulp.task('copy-root', function () {
    return gulp.src(['src/root/*.html', 'src/root/*.xml', 'src/root/*.png', 'src/root/*.txt', 'src/root/*.ico', 'src/root/*.json', 'src/root/.htaccess', 'src/root/*/*.*'])
        .pipe(gulp.dest(path));
});


gulp.task('copy-layout', function () {
    return gulp.src('public/application/templates/crossuite2_revision/layout.xsl')
        .pipe(gulp.dest('public/application/templates/crossuite2/'));
});

gulp.task('copy-font', function () {
    return gulp.src('src/font/*')
        .pipe(gulp.dest(path + 'font'));
});

gulp.task('copy-images', function () {
    return gulp.src('src/img/*')
        .pipe(gulp.dest(path + 'img'));
});

gulp.task('copy-page', function () {
    return gulp.src('src/app/page/**/*.html')
        .pipe(gulp.dest(path + 'page'));
});

gulp.task('copy-favicon', function () {
    return gulp.src('src/favicons/*')
        .pipe(gulp.dest(path + 'favicons'));
});

// jsHint Task
/*gulp.task('jsHint', function() {
 return gulp.src('src/!**!/!*.js')
 .pipe(jshint({
 esnext: true
 }))
 .pipe(jshint.reporter('default'));
 });*/

gulp.task('template-cache', function () {
    return gulp.src('src/app/**/*tpl.html')
        .pipe(templateCache('templates.js', {
            standalone: true
        }))
        .pipe(gulp.dest(path + 'tpl'));
    /*.on('end', function(){
     console.log('Done template cache');
     });*/
});

gulp.task('minify', function () {
    var result = gulp.src([path + 'lib/vendor.js', path + 'tpl/templates.js', path + 'lib/app.js']);
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
        mangle: true
    }));
    if (doSourceMaps) {
        result = result.pipe(sourcemaps.write());
    }
    return result.pipe(gulp.dest(path + 'app'));
});

gulp.task('pot', function () {
    return gulp.src(['src/**/*.html', 'src/**/*.js'])
        .pipe(gettext.extract('template.pot', {
            // options to pass to angular-gettext-tools...
        }))
        .pipe(gulp.dest(path + 'po/'));
});

gulp.task('translations', function () {
    return gulp.src('po/**/*.po')
        .pipe(gettext.compile({
            // options to pass to angular-gettext-tools...
            format: 'json',
            module: getTextModule
        }))
        .pipe(gulp.dest(path + 'translations/'));
});

// Watch Files For Changes
gulp.task('watch', function () {
    gulp.watch('src/sass/**/*.scss', ['sass']);
    gulp.watch('src/app/**/*tpl.html', ['template-cache']);
    gulp.watch('src/app/vendor/**/*.js', ['vendor']);
    gulp.watch('src/root/*', ['copy-root']);
    gulp.watch('public/application/templates/crossuite2_revision/*', ['copy-layout']);
    gulp.watch('src/app/page/**/*.html', ['copy-page']);

    return buildScript('src/app.js', true, false);
});

gulp.task('watch-solo', function () {
    gulp.watch('src/sass/**/*.scss', ['sass']);
    gulp.watch('src/app/**/*tpl.html', ['template-cache']);
    gulp.watch('src/app/page/**/*.html', ['copy-page']);

    return buildScript('src/app.js', true, false);
});

gulp.task('revolddev', function () {
    return gulp.src(['public/css/*-*.css', 'public/lib/app-*.js', 'public/lib/vendor-*.js', 'public/tpl/templates-*.js', 'public/app/app-all-*.js'], {read: false})
        .pipe(rimraf());
});

gulp.task('revision', ['copy-layout'], function () {
    return gulp.src([
            path + '**/*.css',
            '!' + path + '**/ckeditor/**/*',
            '!' + path + '**/*-*.css',
            '!' + path + 'preview/*.css',
            '!' + path + 'jslib/*.css',
            path + '**/app.js',
            path + '**/vendor.js',
            path + '**/templates.js',
            path + '**/app-all.js'
        ])
        .pipe(rev())
        .pipe(gulp.dest(path))
        .pipe(rev.manifest(null, {
            merge: true
        }))
        .pipe(gulp.dest(path));
});

gulp.task("revreplace", ["revision"], function () {
    var manifest = gulp.src(path + "rev-manifest.json");

    return gulp.src("public/application/templates/crossuite2/layout.xsl")
        .pipe(revReplace({
            replaceInExtensions: ['.xsl', '.js', '.css', '.html', '.hbs'],
            manifest: manifest
        }))
        .pipe(gulp.dest('public/application/templates/crossuite2/'));
});

gulp.task("modernizr-compile", function () {
    gulp.src('./**/**')
        .pipe(exec('./node_modules/modernizr/bin/modernizr -c modernizr-config.json -d ./src/app/vendor/modernizr/'));
});


//gulp.task('init', ['vendor', 'copy-font', 'copy-images']);
gulp.task('init-dev', ['vendor', 'copy-font', 'copy-images', 'copy-favicon']);

//gulp.task('copy-others', ['template-cache', 'copy-root', 'copy-page', 'sass', 'translations', 'copy-cdn']);
gulp.task('copy-others', ['template-cache', 'copy-layout', 'copy-page', 'sass', 'translations', 'copy-cdn']);
//gulp.task('copy-all', ['init-dev', 'transpile', 'copy-others']);

gulp.task('fast', ['template-cache', 'copy-layout', 'copy-page', 'watch']);

gulp.task('develop', function () {
    runSequence('init-dev', 'transpile', 'copy-others');
});

gulp.task('release', function () {
    doSourceMaps = false;
    doAnotate = true;
    runSequence('init-dev', 'transpile-final', 'copy-others', 'minify', 'revreplace');
});

gulp.task('prev', ['transpile', 'copy-root']);

gulp.task('rev-final', function () {
    runSequence('transpile', 'minify', 'revreplace');
});

// Default Task
//gulp.task('develop', ['jsHint', 'watch']);
gulp.task('default', ['fast']);