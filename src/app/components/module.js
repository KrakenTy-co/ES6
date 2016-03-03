import angular from 'angular';

import applicationRoot from './application-root/application.root';

angular.module('components', [])
    .component('applicationRoot', applicationRoot)
;

export default 'components';