export default class projectSettingsController {
    /*@ngInject*/
    constructor(fireBase, supportService, $stateParams) {
		this.userId = supportService.getCookie('user');
        this.projectId = $stateParams.project_id;
        this._fireBase = fireBase;
		this.project = fireBase.getSprint(this.projectId);
		this.users = fireBase.getAllUsers();
        this.projectUsers = fireBase.getProjectUsers(this.projectId);
		console.log(this.userId)
    }

    updateProject(){
        let ids = [];
        this.users.filter(item => Object.keys(item['my-projects']).filter(item => item === this.projectId).length>0).map(item => ids.push(item.$id));
        console.log(ids)
        let self = this;
        this._fireBase.updateProject(ids, this.projectId, {
        	projectName: this.project.projectName,
        	duration: this.project.duration,
        	background: this.project.background,
        })
    }
	
	addUserToProject(){
		let userData = this.users.filter(item => item.$id === this.newUserId)[0];
        this._fireBase.addUserToProject(userData.$id, this.projectId, {
            username: userData.username,
            email: userData.email,
            avatar: userData.avatar
        }, {
            projectName: this.project.projectName,
            background: this.project.background
        });
        
	}
}

