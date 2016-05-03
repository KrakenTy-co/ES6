import {ApplicationRoot} from './application.root';
import ApplicationRootService from './application.root.service';

describe('ApplicationRootController', function () {
    let service = new ApplicationRootService();
    let controller = new ApplicationRoot(service);

    it('has valid service object', function () {
        expect(controller.arService).toEqual(new ApplicationRootService);
    });

    it('calling $onInit setted "base name" to service', () => {
        controller.name = 'base name';
        controller.$onInit();
        expect(service.appName).toBe('base name');
    });
});