export default class sprintController {
    /*@ngInject*/
    constructor($element, fireBase, $stateParams, $scope, supportService, $timeout) {
        this._scope = $scope;
        this.element = $element;

        this.projectId = $stateParams.project_id;
        this.project = fireBase.getSprint(this.projectId);
        this.currentSprint = fireBase.getSprint(this.projectId);
        this.lists = fireBase.getSprintLists(this.projectId);
        this.cards = fireBase.getListCards(this.projectId);
        this.users = fireBase.getProjectUsers(this.projectId);
        this._fireBase = fireBase;

        this.userId = supportService.getUserId();
        this.supportService = supportService;

        this.isShown = true;
        this.focusElement = null
        this.observableElement;
        this.targetForClosing = false;
        this.addListShow = true;
        this.cardName = [];
        this.newListName = null;
        this.hide = this.toShowProjectSettings.bind(this);
        this.showProjectSettings = false;
        this.projectDelay = false;

        this.query = {
            0: 'red',
            1: 'yellow',
            2: 'green',
            3: 'blue'
        }

        this._$timeout = $timeout;
        this.isShowWind = false;
        this.isShowUser = null;
        this.isShowIndex = null;
        this.isShowTop = null;
        this.isShowLeft = null;
        this.nextState = false;
        this.isShowManager = false;

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
            this._fireBase.addExecutorsToTask(this.projectId, card.$id, item.$id, {
                priority: card.priority,
                title: card.title,
                createdAt: card.createdAt
            });
            return false;
        };

        $scope.listDrop = (list, index, lists)=> {
            index -=2 ;

            if (index <= 1) {
                for (let i = 2; i <= lists.length - 2; i++) {
                    this._fireBase.changeListPosition(this.projectId, lists[i].$id, index + i+5)
                }
                this._fireBase.changeListPosition(this.projectId, list.$id, 3);
            } else {
                if (index < 2 || index > 99) return;

                for (let i = 2; i <= lists.length - 2; i++) {
                    if (i <= index) {
                        this._fireBase.changeListPosition(this.projectId, lists[i].$id, i)
                    }
                    else if (i > index) {
                        this._fireBase.changeListPosition(this.projectId, lists[i].$id, index + i + 10)
                    }
                }
                this._fireBase.changeListPosition(this.projectId, list.$id, index + 5);
            }
            return false;
        };

    }

    $onInit(){
        // document.addEventListener('click', (event)=>{
            // this.clickWatcher(event.target)
        // })
        setTimeout( ()=>{
            this.projectDelay = true;
        },100)
    }

    get transitionProterty() {
        if (this.projectDelay) {
            return 'all 0.5s'
        } else {
            return 'none';
        }
    }

    get transitionProtertyBacklog() {
        if (this.projectDelay) {
            return 'all 0.8s'
        } else {
            return 'none';
        }
    }

    get isProjectHasHistory() {
        return this.project.sprintNumber > 1;
    }

    get projBackgound() {
        if (this.project && 'background' in this.project) {
            return this.project.background;
        } else {
            return '../../../backgrount-default.jpg'
        }
    }
    get isProjectManager() {
        if (this.project.managerId == this.userId){
            return true;
        }
        else {
            return false;
        }
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
    get isAddListActive(){
        return this.addListShow;
    }

    set isAddListActive(val) {
        this.addListShow = val;
    }

    getUser(userId) {
        return this.users.filter(item => item.$id === userId);
    }

    cardExecutors(card){
        let arr = [];
        for (let key in card.executors){
            arr.push(card.executors[key])
        }
        return arr.slice(0,2);
    }

    cardExecutorsFull(card){
        let arr = [];
        for (let key in card.executors){
            arr.push(card.executors[key])
        }
        if (arr.length > 2){
            return true;
        } else {
            return false;
        }
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
        el[0].style.left = '-260px';
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
        if(this.cardName[listId]) {
            let self = this;
            let createdDate = Date.parse(new Date());
            var temp = this.cardName[listId];
            this.cardName[listId] = '';
            if (temp == '') return;
            let cardData = {
                title: temp,
                list_id: listId,
                id: Math.random() * 1000000 ^ 0,
                priority: 2,
                createdAt: createdDate
            };
            if (listId !== 1) cardData.sprintStart = this.currentSprint.sprintNumber;
            this._fireBase.addCard(this.cards, cardData, this.currentSprint.managerId, this.projectId).then(rootRef => {
                if (listId !== 1)
                    self._fireBase.addToHistory(self.projectId, this.currentSprint.sprintNumber, rootRef.key, cardData);
            });
        }
    }


    showFullCard(card){
        // console.log(card, this.project);
        this.supportService.isCardOpen = true;
        this.supportService.openCard = card;
    }
    closeFullCard(){
        this.supportService.isCardOpen = false;
    }


    toShowProjectSettings() {
        this.showProjectSettings = !this.showProjectSettings;
    }
    toHideProjectSettings() {
        this.showProjectSettings = false;
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
    onMenuBlur(list) {
        list.isListMenuShown = false;
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
        if ('descfiles' in card) {
            return Object.keys(card.descfiles)['length']
        } else {
            return 0;
        }
    }
    cardCreatedDate(card) {
        let x = this.supportService.getFormattedDate(card.createdAt)
        return x;

    }
    cardCreatedTime(card) {
        let date = new Date(card.createdAt);
        date = date.toLocaleTimeString();
        return date.substring(0,date.length-6) + date.substring(date.length-3);
    }


    changeListTitle(list) {
        this._fireBase.updateListName(this.projectId, list.$id, this.newListName)
        this.newListName = null;
        list.isListMenuShown = false;
    }

    cardDescription(text) {
        if ('description' in text) {
            if (text.description['length'] && text.description['length'] >= 16) {
                return text.description.slice(0, 14) + '...'
            } else if (text.description['length'] && text.description['length'] < 16) {
                return text.description;
            }
        } else {
            return 'Card description'
        }
    }
    cardsFilter(listId) {
        let arr = this.cards.filter( (el)=> el.list_id == listId)
        return arr.sort(this.cardsPrioritySort);
    }

    cardsPrioritySort(a,b) {
        a = a.priority;
        b = b.priority;
        if (a > b) return 1;
        if (a < b) return -1;
    }

    isExecutors(card) {
        for (let key in card.executors) {
            if (!(key in this.project.users)){
                delete card.executors[key];
            }
        }
        if ('executors' in card && Object.keys(card.executors).length) {
            return false;
        }
        else return true;
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


    scrollListTop(elId) {
        let el = document.getElementById(elId)
        el.scrollBy(0,-98);
    }

    scrollListDown(elId) {
        let el = document.getElementById(elId)
        el.scrollBy(0,98);
    }

    mouseEnterWindowProfileManager(user){
        let self = this;
        this.isShowIndex = 0;
        this.isShowManager = true;
        let el = document.getElementsByClassName('lists-container__project-users__icons');
        let heightElement = document.getElementsByClassName('lists-container__project-users__icons')[this.isShowIndex].clientHeight;
        let widthElement = document.getElementsByClassName('lists-container__project-users__icons')[this.isShowIndex].clientWidth;        
        let pointInitialHeight = document.getElementsByClassName('lists-container__project-users__icons')[this.isShowIndex].offsetTop;
        let pointInitialLeft = document.getElementsByClassName("lists-container__project-users")[0].offsetLeft;
        this.isShowTop = (-25+heightElement+pointInitialHeight)+"px";
        this.isShowLeft = (-270+pointInitialLeft)+"px";
        this.isShowUser = user;
        this.nextState = true;
        this._$timeout(()=>{
            if (self.nextState !== false){
                self.isShowWind = true;                
            }
        }, 1000);
    }

    mouseEnterWindowProfileUser(user, index){ 
        let self = this;
        this.isShowIndex = index+1;
        let el = document.getElementsByClassName('lists-container__project-users__icons');
        let heightElement = document.getElementsByClassName('lists-container__project-users__icons')[this.isShowIndex].clientHeight;
        let widthElement = document.getElementsByClassName('lists-container__project-users__icons')[this.isShowIndex].clientWidth;
        let pointInitialHeight = document.getElementsByClassName('lists-container__project-users__icons')[this.isShowIndex].offsetTop;
        let pointInitialLeft = document.getElementsByClassName("lists-container__project-users")[0].offsetLeft;
        this.isShowTop = (-25+heightElement+pointInitialHeight)+"px";
        this.isShowLeft = (-270+pointInitialLeft)+"px";
        this.isShowUser = user;
        this.nextState = true;
        this._$timeout(()=>{
            if (self.nextState !== false){
                self.isShowWind = true;                
            }
        }, 1000);

    }

    mouseLeaveOrDownWindowProfile(user, index){ 
        this.isShowWind = false;
        this.nextState = false;
        this.isShowManager = false;
    }


}




