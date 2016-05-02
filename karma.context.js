// import angular from 'angular';
import mocks from 'angular-mocks';

import './src/app';

let context = require.context('./src', true, /\.test\.js/);
context.keys().forEach(context);
