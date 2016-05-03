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

    it('task are setted into Map', function () {
        expect(service.tasks).toEqual(new Map);
    });

    it('done tasks are setted into Map', function () {
        expect(service.done).toEqual(new Map);
    });

    describe('list manipulation', function () {

        beforeEach(function () {
            service.tasks.set('something', {});
            service.tasks.set('something2', {});
            service.done.set('something', {});
            service.done.set('something2', {});
        });


        it('put something to task list', function () {
            service.tasks.set('something', {});
            service.tasks.set('something3', {});
            expect(service.tasks.size).toBe(3);
        });

        it('remove something from task list', function () {
            service.tasks.delete('something');
            expect(service.tasks.size).toBe(1);
        });

        it('put something to done list', function () {
            service.done.set('something', {});
            service.done.set('something2', {});
            expect(service.done.size).toBe(2);
        });

        it('falsy representation of removing not present task', function () {
            service.done.set('something', {});
            expect(service.done.delete('something4')).toBeFalsy();
        });
    });
});
