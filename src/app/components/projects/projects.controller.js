export default class projectsController {
    /*@ngInject*/
    constructor(fireBase, supportService) {
        this.userId = supportService.getUserId();
        this.projects = fireBase.getProjects();
        this.myProjects = fireBase.getMyProjects(this.userId);
        this._fireBase = fireBase;
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
        }).then( rootRef => { rootRef.key
            self.projectName = '';
            self.duration = '';
        });
    }
}