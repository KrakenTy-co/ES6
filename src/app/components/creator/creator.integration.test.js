import {Creator} from './creator';
import ApplicationRootService from '../application-root/application.root.service';

describe('CreatorController', function () {

    let service, controller;

    beforeEach(function () {
        service = new ApplicationRootService();
        controller = new Creator(service);
    });

    it('has valid service object', function () {
        expect(controller.arService).toEqual(new ApplicationRootService);
    });

    it('adding new task', () => {
        let name = 'some new task';
        controller.task = name;
        controller.addNewTask({$valid: true});
        expect(service.tasks.size).toBe(1);
        expect(service.tasks.getFirst().todo).toBe(name);
        expect(service.tasks.getFirst().date).toEqual(jasmine.any(Date));
    });

    it('resolve task', () => {
        expect(service.tasks.size).toBe(0);
        controller.resolve();
        expect(service.tasks.size).toBe(0);
        expect(service.done.size).toBe(0);
        controller.task = 'some new task';
        controller.addNewTask({$valid: true});
        // controller.task = 'some new task 2';      // acceptance test
        // controller.addNewTask({$valid: true});
        expect(service.tasks.size).toBe(1);
        controller.resolve(service.tasks.getFirst());
        expect(service.tasks.size).toBe(0);
        expect(service.done.size).toBe(1);
    });

    it('resolve all tasks', () => {
        expect(service.done.size).toBe(0);
        controller.task = 'some new task';
        controller.addNewTask({$valid: true});
        controller.task = 'some new task 2';
        controller.addNewTask({$valid: true});
        expect(service.tasks.size).toBe(2);
        controller.allDone();
        expect(service.tasks.size).toBe(0);
        expect(service.done.size).toBe(2);
    });
});