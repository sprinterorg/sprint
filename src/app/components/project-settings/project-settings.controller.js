export default class projectSettingsController {
    /*@ngInject*/
    constructor(fireBase, supportService, $stateParams, $state, $rootScope, $scope) {
        this._$rootScope = $rootScope;
		this.userId = supportService.getUserId();
        this.projectId = this.projectHash || $stateParams.project_id;
        this._fireBase = fireBase;
		this.project = fireBase.getSprint(this.projectId);
		this.users = fireBase.getAllUsers();
        this.projectUsers = fireBase.getProjectUsers(this.projectId);
        this.cards = fireBase.getListCards(this.projectId);
        this.projectEdit = false;
        this.durationEdit = false
        this.backgroundEdit = false;
        this.backgrounds = supportService.getBackgrounds();
        this._$state = $state;

        $scope.$on('confirmProjectDelete', ()=> {
            this.deleteProject();
            this._$rootScope.$broadcast('hideProjectDelete');
        });
    }

    updateProject() {
        let ids = Object.keys(this.project.users);
        let self = this;
        this._fireBase.updateProject(ids, this.projectId, {
        	projectName: this.project.projectName,
        	duration: this.project.duration,
        	background: this.project.background,
        });
    }
	
    showDeleteConfirmation(){
        this._$rootScope.$broadcast('showProjectDeleteConfirmation','');
    }

    deleteProject() {
        let ids = [];
        this.projectUsers.map( user => ids.push(user.$id));
        this._fireBase.deleteProject(ids, this.projectId);
        this._$state.go('profile');
    }

    isManager(userId) {
        return userId == this.userId;
    }

    editProjectName($event, save) {
        this.projectEdit = !this.projectEdit;
        let el = $event.target.parentNode.parentNode.parentNode.querySelector('.project-settings__input--name');
        if(save) this.updateProject();
        if($event) setTimeout( () => el.focus(), 10);

    }

    editProjectDuration($event, save) {
        this.durationEdit = !this.durationEdit;
        let el = $event.target.parentNode.parentNode.parentNode.querySelector('.project-settings__input--duration');
        if(save) this.updateProject();
        else setTimeout( () => el.focus(), 10);
    }

    editProjectBackground() {
        this.backgroundEdit = !this.backgroundEdit;
    }

    selectBackground(background) {
        this.project.background = background;
        this.editProjectBackground();
        this.updateProject();
    }

    selectBackgroundFullscreen(background) {
        this.project.background = background;
        this.updateProject();
    }

    closeSprint() {
        let usersOfClosedTasks = [this.project.managerId];
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
                    allTasks[item.$id].sprintEnd = this.project.sprintNumber;
                    closedTasks.push(item.$id);
                    if(item.executors) {
                        let keyArr = Object.keys(item.executors);
                        for (let key of keyArr)
                            usersOfClosedTasks.push(key);
                    }
                }
            }
        }

        let closedSprintData = {
            projectName: this.project.projectName,
            sprintStart: this.project.startTimeStamp,
            sprintActualFinish: Date.now(),
            tasksTotal: Object.keys(allTasks).length,
            tasksClosed: closedTasks.length
        };

        this._fireBase.addClosedToHistory(this.projectId, this.project.sprintNumber, allTasks);
        this._fireBase.deleteClosedTasks(this.projectId, closedTasks, usersOfClosedTasks);
        this._fireBase.updateSprintData(this.projectId, this.project.sprintNumber, closedSprintData);
    }
}

