export default class sprintController {
    /*@ngInject*/
    constructor($element, fireBase, $stateParams, $scope, supportService) {
        this.projectId = $stateParams.project_id;
        this.currentSprint = fireBase.getSprint(this.projectId);
        this.lists = fireBase.getSprintLists(this.projectId);
        this.cards = fireBase.getListCards(this.projectId);
        this.users = fireBase.getProjectUsers(this.projectId);
        this._fireBase = fireBase;
        this._scope = $scope;
        this.userId = supportService.getUserId();
        this.supportService = supportService;
        this.element = $element;
        this.isShown = true;

        this.cardName = [];

        this.hide = this.toShowProjectSettings.bind(this);
        this.showProjectSettings = false;

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


            // this._fireBase.addUserToCard(card.$id, this.projectId, item.username);

            this._fireBase.addExecutorsToTask(this.projectId, card.$id, item.$id, {
                priority: card.priority,
                title: card.title
            });

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
    }

    getUser(userId) {
        return this.users.filter(item => item.$id === userId)[0].avatar;
    }

    showBacklog() {
        this.isShown = false;
        let el = document.getElementsByClassName('list backlog');
        el[0].style.left = '0px';
        let lists = document.getElementsByClassName('list');
        lists[2].style.marginLeft = '260px';
    }

    hideBacklog(){
        this.isShown = true;
        let el = document.getElementsByClassName('list backlog');
        el[0].style.left = '-240px';
        let lists = document.getElementsByClassName('list');
        lists[2].style.marginLeft = '10px';
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

    openAddCardToList(list) {
        console.log('list', list)
        if(list.openAddCard == true) {
            list.openAddCard = false;
        } else {
            list.openAddCard = true;
        }
    }

    addCard(listId, list) {
        let self = this;
        var temp = this.cardName[listId];
        list.openAddCard = false;
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
        let usersOfClosedTasks = [this.currentSprint.managerId];
        let closedTasks = [];
        let allTasks = {};
        
        for (let item of this.cards) {
               if (item.list_id !== 1) {
                allTasks[item.$id] = {
                    title: item.title, 
                    list_id: item.list_id,
                    id: item.id,
                    priority: item.priority,
                    sprintStart: item.sprintStart
                };
                if (item.list_id === 3) {
                    allTasks[item.$id].sprintEnd = this.currentSprint.sprintNumber;
                    closedTasks.push(item.$id);
                    if(item.executors) {
                        let keyArr = Object.keys(item.executors);
                        for (let key of keyArr)i
                            usersOfClosedTasks.push(key);
                    }
                }
            }
        }

        let closedSprintData = {
            projectName: this.currentSprint.projectName,
            sprintStart: this.currentSprint.startTimeStamp,
            sprintActualFinish: Date.now(),
            tasksTotal: Object.keys(allTasks).length,
            tasksClosed: closedTasks.length
        };

        this._fireBase.addClosedToHistory(this.projectId, this.currentSprint.sprintNumber, allTasks);
        this._fireBase.deleteClosedTasks(this.projectId, closedTasks, usersOfClosedTasks);
        this._fireBase.updateSprintData(this.projectId, this.currentSprint.sprintNumber, closedSprintData);
    }

    toShowProjectSettings() {
        this.showProjectSettings = !this.showProjectSettings;
    }

    showListMenu(list) {
        list.isListMenuShown = true;
    }
    hideListMenu(list) {
        list.isListMenuShown = false;
    }

    cardsCountForList(list) {
        let count = 0;
        for (let i=0; i<this.cards.length; i++) {
            if (this.cards[i].list_id == list.listId){
                count++;
            }
        }
        return count;
    }

}




