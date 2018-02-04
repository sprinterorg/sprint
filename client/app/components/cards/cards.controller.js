export default class CardsController{
    /*@ngInject*/
    constructor(fireBase, $stateParams, $scope, supportService) {
      this.projectId = $stateParams.project_id;
      this._fireBase = fireBase;
      this._scope = $scope;

    }

     addCard(listId) {
        let self = this;
        this._fireBase.addCard(this.cards, {title: this.cardName, list_id: listId}, this.userId, this.projectId).then(rootRef => {
            /*let id = rootRef.key;*/
            self.cardName = '';
        });
    };
}

