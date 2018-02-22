export default class projectSettingsController {
    /*@ngInject*/
    constructor(fireBase, supportService, $stateParams) {
		this.userId = supportService.getUserId();
        this.projectId = this.projectHash || $stateParams.project_id;
        this._fireBase = fireBase;
		this.project = fireBase.getSprint(this.projectId);
		this.users = fireBase.getAllUsers();
        this.projectUsers = fireBase.getProjectUsers(this.projectId);
        this.cards = fireBase.getListCards(this.projectId);
        this.projectEdit = false;
        this.durationEdit = false;
        this.backgroundEdit = false;
        this.addUserSelect = false;
        this.backgrounds = supportService.getBackgrounds();
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
	
	addUserToProject(user) {
        this._fireBase.addUserToProject(user.$id, this.projectId, {
            username: user.username,
            email: user.email,
            avatar: user.avatar
        }, {
            projectName: this.project.projectName,
            background: this.project.background,
            managerId: this.project.managerId
        });
         this.addUserSelect = false;
	}

    deleteUserFromProject(userId) {
        let cards = [];
        this.cards.filter(card => {if (card.executors) return userId in card.executors; return false}).forEach(card => cards.push(card.$id));
        console.log(cards)
        this._fireBase.deleteUserFromProject(userId, this.projectId, cards);
    }


    deleteProject() {
        let ids = [];
        this.projectUsers.map( user => ids.push(user.$id));
        this._fireBase.deleteProject(ids, this.projectId);
    }

    isManager(userId) {
        return userId == this.userId;
    }

    editProjectName(save) {
        this.projectEdit = !this.projectEdit;
        if(save) this.updateProject();

    }

    editProjectDuration(save) {
        this.durationEdit = !this.durationEdit;
        if(save) this.updateProject();
    }

    editProjectBackground() {
        this.backgroundEdit = !this.backgroundEdit;
    }

    selectBackground(background) {
        this.project.background = background;
        this.editProjectBackground();
        this.updateProject();
    }
    showAddUser() {
        this.addUserSelect = !this.addUserSelect;
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
                        for (let key of keyArr)i
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

