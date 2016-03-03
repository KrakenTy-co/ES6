class ApplicationRoot {

    // @ngInject
    constructor() {
        this.target = 'angular';
    }
}

export default {
    bindings: {},
    controller: ApplicationRoot,
    template: '<div>Hello {{$ctrl.target}}!</div>'
};