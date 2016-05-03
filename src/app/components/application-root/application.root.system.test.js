describe('ApplicationRoot System test', () => {
    let element, scope, service;
    let baseName = 'ES6 Example';

    beforeEach(angular.mock.module('es6'));

    beforeEach(inject(function(_$rootScope_,_$compile_, _applicationRootService_) {
        let $rootScope = _$rootScope_;
        let $compile = _$compile_;
        service = _applicationRootService_;

        scope = $rootScope.$new();

        // $componentController('ApplicationRoot', null, {});
        element = angular.element(`<application-root name="${baseName}">Loading...</application-root>`);

        $compile(element)(scope);
        $rootScope.$digest();

    }));

    it(`controller should contain string name "${baseName}"`, () => {
        expect(element.isolateScope().$ctrl.name).toBe(baseName);
    });

    it(`service should contain "${baseName}"`, () => {
        expect(service.appName).toBe(baseName);
    });
});