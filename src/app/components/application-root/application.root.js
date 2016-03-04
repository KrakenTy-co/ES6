class ApplicationRoot {

    // @ngInject
    constructor(applicationRootService) {
        applicationRootService.appName = this.name;
    }
}

export default {
    bindings: {
        name: '@'
    },
    controller: ApplicationRoot,
    templateUrl: 'components/application-root/application.root.tpl.html'
};