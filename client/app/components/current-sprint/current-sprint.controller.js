export default class sprintController {
    /*@ngInject*/
    constructor(fireBase, $stateParams, $scope) {
        this.projectId = $stateParams.project_id;
        this.currentSprint = fireBase.getSprint(this.projectId)
        this.lists = fireBase.getSprintLists(this.projectId);
        this.cards = fireBase.getListCards(this.projectId);
        this._fireBase = fireBase;
        this._scope = $scope;

        this._scope.$on('second-bag.drag', (e, el) => {
            console.log('eeeel', this.lists, this.cards);
            // el.removeClass('ex-moved');
            // el.addClass('ex');
            //
            // var cardObj = JSON.parse(el[0].id)
            // var indexInList = Array.prototype.indexOf.call(el.parent().parent()[0].children, el.parent()[0])
            // var cardsInList = el.parent().parent()[0].children
            // // this._fireBase.moveToList(cardObj.$id, 1, this.projectId)
        });

        this._scope.$on('second-bag.drop', (e, el) => {
            el.addClass('ex-moved');
            console.log('ex-moved prop')
            // console.log('moved drop')
        });

        this._scope.$on('second-bag.over', (e, el, container) => {
            container.addClass('ex-over');
            console.log('over')
        });

        this._scope.$on('second-bag.out', (e, el, container) => {
            container.removeClass('ex-over');
            console.log('over out')
            // el.addClass('ex');
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
        let self = this;
        this._fireBase.addCard(this.cards, {title: this.cardName, list_id: listId}).then(function (rootRef) {
            /*let id = rootRef.key;*/
            self.cardName = '';
        });
    };
}

