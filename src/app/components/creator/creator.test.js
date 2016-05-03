import {Creator} from './creator';

describe('CreatorController', function () {
    let controller = new Creator();

    it('contain arService property', () => {
        expect('arService' in controller).toBeTruthy();
    });

    it('contain task property and its null', () => {
        expect('task' in controller).toBeTruthy();
        expect(controller.task).toBe(null);
    });

    it('has arService property', function () {
        let controller = new Creator({});
        expect(controller.arService).toBeDefined();
    });

    it('has addNewTask method', function () {
        expect(typeof controller.addNewTask).toBe('function');
    });

    it('has resolve method', function () {
        expect(typeof controller.resolve).toBe('function');
    });

    it('has allDone method', function () {
        expect(typeof controller.allDone).toBe('function');
    });
});