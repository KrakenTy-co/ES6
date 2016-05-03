export class ApplicationRoot {

    // @ngInject
    constructor(applicationRootService) {
        this.arService = applicationRootService;
    }

    $onInit() {
        this.arService.appName = this.name;
    }
}

export default {
    bindings: {
        name: '@'
    },
    controller: ApplicationRoot,
    templateUrl: 'application-root/application.root.tpl.html'
};