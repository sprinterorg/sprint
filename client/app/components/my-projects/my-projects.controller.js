export default class myProjectsComponent{
    /*@ngInject*/
     constructor(fireBase, supportService) {
        this.projects = fireBase.getMyProjects(supportService.getUserId);
        this._fireBase = fireBase;
        console.log(this.projects.length);
    }

    getTasks(projectId){
        return this._fireBase.getListCards(projectId);
    }
}

