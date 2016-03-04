import MapList from '../map.list';

export default class ApplicationRootService {

    // @ngInject
    constructor() {
        this.appName = null;

        this.tasks = new MapList();
        this.done = new MapList();
    }


}