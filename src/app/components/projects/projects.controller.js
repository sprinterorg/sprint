export default class projectsController {
    /*@ngInject*/
    constructor(fireBase, supportService) {
        this.projects = fireBase.getProjects();
        this._fireBase = fireBase;
        this.userId = supportService.getCookie('user');
        this.manager = fireBase.getUser(this.userId);
    }

    addProject () {
        let self = this;
        this._fireBase.addProject(this.projects, {currentSprint : { 
            projectName: this.projectName,
            managerId: this.userId,
            duration: this.duration
        }}, {
            username: this.manager.username,
            email: this.manager.email,
            avatar: this.manager.avatar
        }).then( rootRef => {
            self.projectName = '';
            self.duration = '';
        });
    }
}