// override
Map.prototype.listArray = [];
Map.prototype.current = 0;
Map.prototype.listKey = null;

Object.defineProperties(Map.prototype, {
        initList: {
            value: function () {
                this.clearKeys();
                this.listArray = [];
                this.doReset();
            }
        },

        clearKeys: {
            value: function () {
                this.listKey = null;
            }
        },

        clearList: {
            value: function () {
                this.initList();
                this.clear();
            }
        },

        getList: {
            value: function () {
                let listKey = JSON.stringify([...this.keys()]);

                if (this.listKey != listKey) {
                    this.listKey = listKey;
                    this.listArray = [...this.values()];
                }

                return this.listArray;
            }
        },

        list: {
            set: function (array) {
                this.clearList();
                angular.merge(this, new MapList(array));
            },
            get: function () {
                return this.getList();
            }
        },

        appendMap: {
            value: function (newMap = null) {
                if (newMap instanceof Map) {
                    for (let [key, value] of newMap) {
                        this.set(key, value);
                    }
                }
            }
        },

        goNext: {
            value: function () {
                return this.listArray[++this.current];
            }
        },

        goPrev: {
            value: function () {
                return this.listArray[--this.current];
            }
        },

        doReset: {
            value: function () {
                this.current = 0;
            }
        },

        getCurrent: {
            value: function () {
                return this.current;
            }
        },

        getFirst: {
            value: function (returnKey = false) {
                if (returnKey) {
                    let key = this.keys().next();
                    return key.value ? key.value : null;
                }

                let value = this.values().next();
                return value.value ? value.value : null;
            }
        }
    }
);

Set.prototype.current = 0;

Object.defineProperties(Set.prototype, {
        clearList: {
            value: function () {
                this.clear();
                this.reset();
            }
        },


        getList: {
            value: function () {
                return [...this];
            }
        },

        list: {
            set: function (array) {
                this.clearList();
                angular.merge(this, new SetList(array));
            },
            get: function () {
                return this.getList();
            }
        },


        appendSet: {
            value: function (newSet = null) {
                if (newSet instanceof Set) {
                    for (let value of newSet) {
                        this.add(value);
                    }
                }
            }
        },

        goNext: {
            value: function () {
                return [...this][++this.current];
            }
        },

        goPrev: {
            value: function () {
                return [...this][--this.current];
            }
        },

        doReset: {
            value: function () {
                this.current = 0;
            }
        },

        getCurrent: {
            value: function () {
                return this.current;
            }
        },

        getFirst: {
            value: function () {
                let value = this.values().next();
                return value.value ? value.value : null;
            }
        }
    }
);