// Karma configuration
'use strict';

module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['browserify', 'jasmine'],
        proxies:  {
            // '/img/': 'http://localhost:9876/img/'
        },
        files: [
            'http://code.jquery.com/jquery-2.2.0.min.js',
            'public/lib/app.js',
            'node_modules/angular-mocks/angular-mocks.js',
            'src/**/*.test.js'
        ],

        preprocessors: {
            // 'karma.context.js': ['browserify']
            'src/**/*.test.js': ['browserify']
        },
        exclude: [],

        reporters: ['progress'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        singleRun: false,
        browsers: ['Chrome'],

        browserify: {
            debug: true,
            configure: function browserify(bundle) {
                bundle.once('prebundle', function prebundle() {
                    bundle.transform('babelify', {presets: ['es2015']});
                });
            }
        }
    });
};