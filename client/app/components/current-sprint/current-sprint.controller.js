export default class sprintController {
    /*@ngInject*/
    constructor(fireBase, $stateParams) {
        this.projectId = $stateParams.project_id;
        this.currentSprint = fireBase.getSprint(this.projectId)
        this.lists = fireBase.getSprintLists(this.projectId);
		this.cards = fireBase.getListCards(this.projectId);
        this._fireBase = fireBase;
    }

    addList() {
        let self = this;
        this._fireBase.addList(this.lists, {listName: this.listName}).then(rootRef => {
            self.listName = '';
        });
    }

    deleteList(list) {
        this._fireBase.deleteList(this.cards.filter(item => item.list_id === list.listId), this.projectId, list.$id);
    }
}

