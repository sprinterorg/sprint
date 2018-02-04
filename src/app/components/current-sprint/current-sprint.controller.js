export default class sprintController {
    /*@ngInject*/
    constructor(fireBase, $stateParams, $scope, supportService) {
        this.projectId = $stateParams.project_id;
        this.currentSprint = fireBase.getSprint(this.projectId)
        this.lists = fireBase.getSprintLists(this.projectId);
        this.cards = fireBase.getListCards(this.projectId);
        this._fireBase = fireBase;
        this._scope = $scope;
        this.userId = supportService.getCookie('user');
        this.isModalOpen = false;

        this._scope.$on('second-bag.drag', (e, el) => {
            el.addClass('ex-moved');
            // var indexInList = Array.prototype.indexOf.call(el.parent().parent()[0].children, el.parent()[0])
        });

        this._scope.$on('first-bag.drop', (e, el) => {
            el.removeClass('ex-moved');
            var cardId = JSON.parse(el[0].id)
            var newListId = el.parent().parent()[0].children[0].id
            console.log('list', newListId, cardId.$id)
            this._fireBase.moveToList(cardId.$id, Number(newListId) || 1, this.projectId)
        });

        this._scope.$on('first-bag.over', (e, el, container) => {
            container.addClass('ex-over');
        });

        this._scope.$on('first-bag.out', (e, el, container) => {
            container.removeClass('ex-over');
        });
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

    addCard(listId) {
        var temp = this.cardName[listId];
        this.cardName[listId] = '';
        this._fireBase.addCard(this.cards, {title: temp, list_id: listId}).then(function (rootRef) {
            /*let id = rootRef.key;*/
        });
    };
    showFullCard(card){
        console.log(card);
        this.isModalOpen = true;
        this.title = card.title;
        this.cardSuperId = card.$id;
        this.cardSimpleId = card.id;
        this.cardListId = card.list_id;
        this.superPriority = card.$priority;
        this.priority = card.priority;
    }
    closeFullCard(){
        this.isModalOpen = false;
    }
}

