export default class projectsController {
    /*@ngInject*/
    constructor(fireBase, supportService, $state) {
        this._$state = $state;
        this.userId = supportService.getUserId();
        this.projects = fireBase.getProjects();
        this.myProjects = fireBase.getMyProjects(this.userId);
        this._fireBase = fireBase;
        this.manager = fireBase.getUser(this.userId);
    }

    addProject () {
        let self = this;
        this.hideFunc();
        this._fireBase.addProject(this.projects, {currentSprint : { 
            projectName: this.projectName,
            managerId: this.userId,
            duration: this.duration,
            startTimeStamp: Date.now()
        }}, {
            username: this.manager.username,
            email: this.manager.email,
            avatar: this.manager.avatar
        }).then( rootRef => {
            //self.projectName = '';
            //self.duration = '';
            self._$state.go('current-sprint', {project_id: rootRef.key});
        });
    }
}