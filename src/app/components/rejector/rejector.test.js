import {Rejector} from './rejector';

describe('RejectorController', function () {
    let controller = new Rejector();

    it('contain arService property', () => {
        expect('arService' in controller).toBeTruthy();
    });

    it('has reject method', function () {
        expect(typeof controller.reject).toBe('function');
    });
});