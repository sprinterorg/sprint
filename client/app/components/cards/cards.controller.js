export default class CardsController{
    /*@ngInject*/
    constructor(fireBase, $stateParams, $scope) {
      this.projectId = $stateParams.project_id;
      this.cards = fireBase.getListCards(this.projectId);
      this._fireBase = fireBase;
      this._scope = $scope;
    }

     addCard(listId) {
        let self = this;
        this._fireBase.addCard(this.cards, {title: this.cardName, list_id: listId}).then(function (rootRef) {
            /*let id = rootRef.key;*/
            self.cardName = '';
        });
    };
}

