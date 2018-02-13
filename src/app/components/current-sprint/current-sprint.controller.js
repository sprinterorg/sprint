export default class sprintController {
    /*@ngInject*/
    constructor($element, fireBase, $stateParams, $scope, supportService) {
        this.projectId = $stateParams.project_id;
        this.currentSprint = fireBase.getSprint(this.projectId)
        this.lists = fireBase.getSprintLists(this.projectId);
        this.cards = fireBase.getListCards(this.projectId);
        this.users = fireBase.getProjectUsers(this.projectId);
        this._fireBase = fireBase;
        this._scope = $scope;
        this.userId = supportService.getUserId();
        this.isModalOpen = false;
        this.element = $element;
        this.isShown = true;


        $scope.onDrop = (list, card)=>{
            this._fireBase.moveToList(card.$id, Number(list) || 1, this.projectId);
            return false;
        };

        $scope.onUserDrop = (item, card)=>{
            console.log('user drop', item, card);
            this._fireBase.addUserToCard(card.$id, this.projectId, item.username);
            return false;
        };

        $scope.listDrop = (list, index, lists)=> {
            console.log('cards', this.cards)
            if(index < 2 || index > 99) return;

            for(let i=2; i<=lists.length-2; i++) {
                if(i < index) {
                    this._fireBase.changeListPosition(this.projectId, lists[i].$id, i)
                }
                else if(i >= index) {
                    this._fireBase.changeListPosition(this.projectId, lists[i].$id, index+i)
                }
            }
            this._fireBase.changeListPosition(this.projectId, list.$id, index)
            return false;
        };

    }

    $onInit(){
        console.log('users', this.users, this.lists, this.cards)
    }
    showBacklog() {
        this.isShown = false;
        let el = document.getElementsByClassName('backlog');
        el[0].style.left = '-105px';
        let lists = document.getElementsByClassName('list__wrapper');
        lists[1].style.marginLeft = '220px';
    }

    hideBacklog(){
        this.isShown = true;
        let el = document.getElementsByClassName('backlog');
        el[0].style.left = '-400px';
        let lists = document.getElementsByClassName('list__wrapper');
        lists[1].style.marginLeft = '0px';
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
        var temp = this.cardName[listId];
        this.cardName[listId] = '';
        let cardData = {
            title: temp, 
            list_id: listId,
            id: Math.random()*1000000^0,
            priority: 2
        };
        if (listId !== 1) cardData.sprintStart = this.currentSprint.sprintNumber; 
        this._fireBase.addCard(this.cards, cardData, this.currentSprint.managerId, this.projectId).then( rootRef  => {
            if (listId !== 1)
                self._fireBase.addToHistory(self.projectId, rootRef.key, cardData);
        });
    }
    showFullCard(card){
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




