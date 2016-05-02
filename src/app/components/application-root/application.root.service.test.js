'use strict';

import ApplicationRootObj from './application.root';

describe('ApplicationService', function () {

    var service;

    beforeEach(angular.mock.module('components'));

    beforeEach(angular.mock.inject(function (_applicationRootService_) {
        service = _applicationRootService_;
    }));

    it('should contain null appName', function() {
        expect(service.appName).toBe(null);
    });

    it('should add appName', function () {
        service.appName = 'Test name';
        expect(service.appName).toBe('Test name');
    });

    it('imported work as well as from angular dependency', function () {
        let controller = new ApplicationRootObj.controller(service);
        expect(controller.arService).toBe(service);
        service.appName = 'Test name';
        expect(controller.arService.appName).toBe('Test name');
    });
});
