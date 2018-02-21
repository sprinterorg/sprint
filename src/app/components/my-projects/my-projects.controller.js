export default class myProjectsComponent{
    /*@ngInject*/
     constructor(fireBase, supportService, $state) {
        this.userId = supportService.getUserId();
        this.myProjects = fireBase.getMyProjects(this.userId);
        this._fireBase = fireBase;
        this._$state = $state;
        this.searchProjects = '';
        this.showModalWindow = false;
        this.projectToShow = null;
    }

    isManager(managerId) {
    	return this.userId === managerId;
    }

    goToSprint(projectId) {
        if(!this.showModalWindow){
        this._$state.go('current-sprint', {project_id: projectId});
        this.hideFunc && this.hideFunc();
        }
    }

    toShowProjectSettings(projectId) {
        this.projectToShow =  projectId;
        this.showModalWindow = true;
    }
}