export default class CardsController{
    /*@ngInject*/
    constructor(fireBase) {
      this.cards = fireBase.getListCards();
      this._fireBase = fireBase;
    }

     addCard(listId) {
        this._fireBase.addCard(listId, this.cardName);
        console.log('firebase', this._fireBase);
        this.cardName = '';
    };
}

