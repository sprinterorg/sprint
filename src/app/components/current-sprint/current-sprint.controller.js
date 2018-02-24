export default class sprintController {
    /*@ngInject*/
    constructor($element, fireBase, $stateParams, $scope, supportService) {
        this.projectId = $stateParams.project_id;
        this.project = fireBase.getSprint(this.projectId);
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

        this.focusElement = null
        this.observableElement;
        this.targetForClosing = false;
        this.addListShow = true;

        this.cardName = [];
        this.newListName = null;

        this.hide = this.toShowProjectSettings.bind(this);
        this.showProjectSettings = false;

        this.query = {
            0: 'red',
            1: 'yellow',
            2: 'green',
            3: 'blue'
        }



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
        document.addEventListener('click', (event)=>{

            // this.clickWatcher(event.target)

        })
    }

    clickWatcher(target) {

    }


    getUser(userId) {
        return this.users.filter(item => item.$id === userId)[0].avatar || null;
    }

    get managerAvatar(){
        return this.getUser(this.project.managerId);
    }

    get projectLoad(){
        return this.project['managerId'] || null;
    }

    get usersWithoutManager() {
        return this.users.filter( (user)=> user.$id !== this.project.managerId)
    }

    get usersManager() {
        return this.users.filter( (user)=> user.$id === this.project.managerId)
    }

    showBacklog() {
        this.isShown = false;
        let el = document.getElementsByClassName('list backlog');
        el[0].style.left = '0px';
        let lists = document.getElementsByClassName('list');
        lists[2].style.marginLeft = '275px';
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

        setTimeout( () => {
            window.scrollBy(260,0);
        }, 50);
    }

    deleteList(list) {
        this._fireBase.deleteList(this.cards.filter(item => item.list_id === list.listId), this.projectId, list.$id);
    }

    openAddCardToList(list, elId) {

        list.openAddCard = true;

        this.focusElement = document.getElementById(elId)
        this.focusElement.focus();

    }

    onBlur(list) {
        list.openAddCard = false;
    }



    addCard(listId, list) {
        let self = this;
        let createdDate = new Date().toString();
        var temp = this.cardName[listId];
        this.cardName[listId] = '';
        let cardData = {
            title: temp, 
            list_id: listId,
            id: Math.random()*1000000^0,
            priority: 2,
            createdAt: createdDate
        };
        if (listId !== 1) cardData.sprintStart = this.currentSprint.sprintNumber; 
        this._fireBase.addCard(this.cards, cardData, this.currentSprint.managerId, this.projectId).then( rootRef  => {
            if (listId !== 1)
                self._fireBase.addToHistory(self.projectId, this.currentSprint.sprintNumber, rootRef.key, cardData);
        });


    }


    onMenuBlur(list) {
        list.isListMenuShown = false;
    }
    showFullCard(card){
        console.log(card);
        this.supportService.isCardOpen = true;
        this.supportService.openCard = card;

    }
    closeFullCard(){
        this.supportService.isCardOpen = false;
    }

    toShowProjectSettings() {
        this.showProjectSettings = !this.showProjectSettings;
    }

    showListMenu(list, elemId) {

        this.observableElement = document.getElementById(elemId);
        this.targetForClosing = list;

       if (list['isListMenuShown']) {
           list.isListMenuShown = false
       } else {
           list.isListMenuShown = true;
       }

       this.observableElement.children[0].children[0].focus();
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
        let str;
        if (count == 1) {
            str = count.toString() + ' Task';
        }else {
            str = count.toString() + ' Tasks';
        }
        return str;
    }

    cardPrioriry(card) {
        return this.query[card.priority] || 'green';
    }

    cardCommentsCount(card) {
        if ('comments' in card) {
            return Object.keys(card.comments)['length']
        } else {
            return 0;
        }
    }
    cardAttachmentCount(card) {
        if ('attachment' in card) {
            return Object.keys(card.attachment)['length']
        } else {
            return 0;
        }
    }

    changeListTitle(list) {
        this.newListName = null;
        list.isListMenuShown = false;
    }

    scrollListTop(elId) {
        let el = document.getElementById(elId)
        el.scrollBy(0,-98);
    }

    scrollListDown(elId) {
        let el = document.getElementById(elId)
        el.scrollBy(0,98);
    }

    isNeedScroll(elId) {
        let el = document.getElementById(elId);
        if (el.clientHeight < el.scrollHeight) {
            return true;
        } else {
            return false;
        }
    }

    get projBackgound() {
        // console.log(this.project, this.users)
        return this.project.background;
    }

    cardCreatedDate(card) {
        let date = new Date(card.createdAt);
        date = date.toLocaleDateString();
        return date.substring(0, date.length-4) + date.substring(date.length-2);
    }

    cardCreatedTime(card) {
        let date = new Date(card.createdAt);
        date = date.toLocaleTimeString();
        return date.substring(0,date.length-6) + date.substring(date.length-3);
    }

    get isAddListActive(){
        return this.addListShow;
    }

    set isAddListActive(val) {
        this.addListShow = val;
    }
    isAddListActiveFunc(val) {
        this.isAddListActive = val;
        setTimeout( ()=> {
            document.getElementById('addListTitle').focus()
        },10)

    }
    addListBlur(){
        this.isAddListActive = true;
    }

}




