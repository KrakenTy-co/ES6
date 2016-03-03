import "babel-polyfill";

import angular from 'angular';
import animate from 'angular-animate';
import cookies from 'angular-cookies';
import sanitize from 'angular-sanitize';
import aria from 'angular-aria';
import touch from 'angular-touch';

import './app/vendor/modernizr/modernizr';

import components from './app/components/module';

angular.module('es6', [
        animate,
        cookies,
        sanitize,
        aria,
        touch,
        components
    ])

    .constant("Modernizr", window.Modernizr)

    .config($locationProvider => {
        $locationProvider.html5Mode(true);
    })
;
