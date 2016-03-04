import angular from 'angular';

import applicationRoot from './application-root/application.root';
import applicationRootService from './application-root/application.root.service';

import creator from './creator/creator';
import rejector from './rejector/rejector';

angular.module('components', [])
    .component('applicationRoot', applicationRoot)
    .service('applicationRootService', applicationRootService)

    .component('creator', creator)
    .component('rejector', rejector)
;

export default 'components';