export default class projectsController {
    /*@ngInject*/
    constructor(fireBase, $firebaseArray) {
        this.projects = fireBase.getProjects();
        this._fireBase = fireBase;
    }

    addProject () {
        let self = this;
        this._fireBase.addProject(this.projects, {projectName: this.projectName,
            managerID: this.managerID}).then(function (rootRef) {
            self.projectName = '';
            self.managerID = '';
        });
    }
}

