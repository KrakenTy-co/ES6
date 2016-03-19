import "babel-polyfill";

import './app/components/collections.overrides';

import angular from 'angular';
import animate from 'angular-animate';
import cookies from 'angular-cookies';
import sanitize from 'angular-sanitize';
import aria from 'angular-aria';
import touch from 'angular-touch';
import templates from './tpl/index';

import './app/vendor/modernizr/modernizr';

import components from './app/components/module';

angular.module('es6', [
        animate,
        cookies,
        sanitize,
        aria,
        touch,
        templates,
        components
    ])

    .constant("Modernizr", window.Modernizr)

    .config($locationProvider => {
        $locationProvider.html5Mode(true);
    })
;
