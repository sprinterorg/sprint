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
        this.supportService = supportService;
        this.element = $element;
        this.isShown = true;

        $scope.onDrop = (list, card)=>{
            this._fireBase.moveToList(card.$id, Number(list) || 1, this.projectId);
            if(!card.sprintStart && list!==1){
                let cardData = {
                    title: card.title, 
                    list_id: card.list_id,
                    id: card.id,
                    priority: card.priority,
                    sprintStart: this.currentSprint.sprintNumber
                };
                this._fireBase.addToHistory(this.projectId, this.currentSprint.sprintNumber, card.$id, cardData);
            }
            if (list === 1) {
                this._fireBase.removeFromHistory(this.projectId, card.sprintStart, card.$id);
            }
            return false;
        };

        $scope.onUserDrop = (item, card)=>{
            console.log('user drop', item, card);

            // this._fireBase.addUserToCard(card.$id, this.projectId, item.username);

            this._fireBase.addExecutorsToTask(this.projectId, card.$id, item.$id, {
            priority: card.priority,
                title: card.title
        })
            return false;
        };

        $scope.listDrop = (list, index, lists)=> {
            index -=2 ;
            if(index < 2 || index > 99) return;

            for(let i=2; i<=lists.length-2; i++) {
                if(i <= index) {
                    this._fireBase.changeListPosition(this.projectId, lists[i].$id, i)
                }
                else if(i > index) {
                    this._fireBase.changeListPosition(this.projectId, lists[i].$id, index+i+10)
                }
            }
            this._fireBase.changeListPosition(this.projectId, list.$id, index+5);
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
                self._fireBase.addToHistory(self.projectId, this.currentSprint.sprintNumber, rootRef.key, cardData);
        });
    }

    showFullCard(card){
        this.supportService.isCardOpen = true;
        this.supportService.openCard = card;

    }
    closeFullCard(){
        this.supportService.isCardOpen = false;
    }

    closeSprint() {
        let users = [this.currentSprint.managerId];
        let tempObj = {};
        for (let item of this.cards) {
            if (item.list_id === 3)
                tempObj[item.$id] = {
                    title: item.title, 
                    list_id: item.list_id,
                    id: item.id,
                    priority: item.priority,
                    sprintStart: item.sprintStart,
                    sprintEnd: this.currentSprint.sprintNumber
                };
                if(item.executors) {
                    let keyArr = Object.keys(item.executors);
                    for (let key of keyArr)
                        users.push(key);
                }

        }
        this._fireBase.addClosedToHistory(this.projectId, this.currentSprint.sprintNumber, tempObj);
        this._fireBase.deleteClosedTasks(this.projectId, Object.keys(tempObj), users);
        this._fireBase.increaseSprintNumber(this.projectId, this.currentSprint.sprintNumber);
    }
}




