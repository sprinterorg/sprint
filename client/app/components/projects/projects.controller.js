export default class projectsController {
    /*@ngInject*/
    constructor(fireBase) {
        this.projects = fireBase.getProjects();
        this._fireBase = fireBase;
    }

    addProject () {
        let self = this;
        this._fireBase.addProject(this.projects, {currentSprint : { projectName: this.projectName,
            managerID: this.managerID}}).then(function (rootRef) {
            self.projectName = '';
            self.managerID = '';
        });
    }
}

