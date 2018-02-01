export default class CardsController{
    /*@ngInject*/
    constructor(fireBase, $stateParams, $scope) {
      this.projectId = $stateParams.project_id;
      this.cards = fireBase.getListCards(this.projectId);
      this._fireBase = fireBase;
      this._scope = $scope;



        this._scope.$on('second-bag.drag',  (e, el)=>{
            // console.log('el',el[0].id);
            // el.removeClass('ex-moved');
            var cardObj = JSON.parse(el[0].id)
            var indexInList = Array.prototype.indexOf.call(el.parent().parent()[0].children, el.parent()[0])
            var cardsInList = el.parent().parent()[0].children
            this._fireBase.moveToList(cardObj.$id, 1, this.projectId)

        });

        // this._scope.$on('second-bag.drop', function (e, el) {
        //     el.addClass('ex-moved');
        //     // console.log('moved drop')
        // });
        //
        // this._scope.$on('second-bag.over', function (e, el, container) {
        //     container.addClass('ex-over');
        //     // console.log('over')
        // });
        //
        // this._scope.$on('second-bag.out', function (e, el, container) {
        //     container.removeClass('ex-over');
        //     // console.log('over out')
        // });
    }

     addCard(listId) {
        let self = this;
        this._fireBase.addCard(this.cards, {title: this.cardName, list_id: listId}).then(function (rootRef) {
            /*let id = rootRef.key;*/
            self.cardName = '';
        });
    };
}

