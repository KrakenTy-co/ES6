export class Rejector {

    // @ngInject
    constructor(applicationRootService) {
        this.arService = applicationRootService;
    }

    reject(task = null) {
        if(task && this.arService.done.has(task.date)) {
            this.arService.done.delete(task.date);
            task.done = false;
            this.arService.tasks.set(task.date, task);
        }
    }
}

export default {
    bindings: {},
    controller: Rejector,
    templateUrl: 'rejector/rejector.tpl.html'
};