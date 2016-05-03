import {ApplicationRoot} from './application.root';

describe('ApplicationRootController', function () {
    let controller = new ApplicationRoot();

    it('has angular $onInitMethod', function () {
        expect(typeof controller.$onInit).toBe('function');
    });

    it('contain arService property', () => {
        expect('arService' in controller).toBeTruthy();
    });

    it('has arService property', function () {
        let controller = new ApplicationRoot({});
        expect(controller.arService).toBeDefined();
    });
});