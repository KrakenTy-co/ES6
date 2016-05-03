import {Rejector} from './rejector';
import ApplicationRootService from '../application-root/application.root.service';

describe('RejectorController', function () {

    let service, controller;

    beforeEach(function () {
        service = new ApplicationRootService();
        controller = new Rejector(service);
    });

    it('has valid service object', function () {
        expect(controller.arService).toEqual(new ApplicationRootService);
    });

    it('reject empty task', () => {
        expect(service.done.size).toBe(0);
        expect(() => controller.reject()).not.toThrow();
        expect(service.done.size).toBe(0);
    });

    it('reject done task', () => {
        expect(service.done.size).toBe(0);
        let date = new Date();
        service.done.set(date, {
            todo: 'some task',
            date: date
        });
        expect(service.done.size).toBe(1);
        expect(() => controller.reject(service.done.getFirst())).not.toThrow();
        expect(service.done.size).toBe(0);
        expect(service.tasks.size).toBe(1);
    });
});