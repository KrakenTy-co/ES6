export class Creator {

    // @ngInject
    constructor(applicationRootService) {
        this.arService = applicationRootService;

        this.task = null;
    }

    addNewTask(form = {}) {
        if (form.$valid) {
            let date = new Date();
            this.arService.tasks.set(date, {
                todo: this.task,
                date: date
            });
            this.task = null;
        }
    }

    resolve(task = null) {
        if(task && this.arService.tasks.has(task.date)) {
            this.arService.tasks.delete(task.date);
            this.arService.done.set(task.date, task);
        }
    }

    allDone() {
        this.arService.done.appendMap(this.arService.tasks);
        this.arService.tasks.clearList();
    }
}

export default {
    bindings: {},
    controller: Creator,
    templateUrl: 'creator/creator.tpl.html'
};