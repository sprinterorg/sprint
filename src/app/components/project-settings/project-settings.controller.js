export default class projectSettingsController {
    /*@ngInject*/
    constructor(fireBase, supportService, $stateParams) {
		this.userId = supportService.getUserId();
        this.projectId = this.projectHash || $stateParams.project_id;
        this._fireBase = fireBase;
		this.project = fireBase.getSprint(this.projectId);
		this.users = fireBase.getAllUsers();
        this.projectUsers = fireBase.getProjectUsers(this.projectId);
        this.projectEdit = false;
        this.durationEdit = false;
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
	
	addUserToProject() {
		let userData = this.users.filter(item => item.$id === this.newUserId)[0];
        this._fireBase.addUserToProject(userData.$id, this.projectId, {
            username: userData.username,
            email: userData.email,
            avatar: userData.avatar
        }, {
            projectName: this.project.projectName,
            background: this.project.background,
            managerId: this.project.managerId
        });
        
	}

    deleteUserFromProject(userId) {
        this._fireBase.deleteUserFromProject(userId, this.projectId);
    }


    deleteProject() {
        let ids = [];
        this.projectUsers.map( user => ids.push(user.$id));
        this._fireBase.deleteProject(ids, this.projectId);
    }

    isManager(userId) {
        return userId == this.userId;
    }

    editProjectName() {
        this.projectEdit = !this.projectEdit;
    }

    editProjectDuration() {
        this.durationEdit = !this.durationEdit;
    }
}

