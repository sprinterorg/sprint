export default class sprintController {
    /*@ngInject*/
    constructor(fireBase, $stateParams) {
        this.projectId = $stateParams.project_id;
        this.lists = fireBase.getSprintLists(this.projectId);
        this._fireBase = fireBase;
    }

    addList() {
        let self = this;
        this._fireBase.addList(this.lists, {listName: this.listName}).then(function (rootRef) {
            self.listName = '';
        });
    }

    deleteList(listId) {
        this._fireBase.deleteList(this.projectId, listId);
        
    }
}

