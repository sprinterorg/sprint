export default class sprintController {
    /*@ngInject*/
    constructor(fireBase, $stateParams) {
        this.lists = fireBase.getSprintLists();
        this._fireBase = fireBase;
    }

    addList() {
        this._fireBase.addList(this.listName);
        this.listName = '';
    };

    deleteList(list) {
        this._fireBase.deleteList(list);
        
    }
}

