export default class MapList extends Map {

    constructor(iterable) {
        super(iterable);

        this.initList();
    }

    initList() {
        this.listKey = null;
        this.listArray = [];
    }

    getList() {
        let listKey = JSON.stringify([...this.keys()]);

        if(this.listKey != listKey) {
            this.listKey = listKey;
            this.listArray = [...this.values()];
        }

        return this.listArray;
    }

    clearList() {
        this.initList();
        this.clear();
    }

    appendMap(newMap = null) {
        if(newMap instanceof Map) {
            for (let [key, value] of newMap) {
                this.set(key, value);
            }
        }
    }

    set list(array) {
        this.clearList();
        angular.merge(this, new MapList(array));
    }

    get list() {
        return this.getList();
    }
}