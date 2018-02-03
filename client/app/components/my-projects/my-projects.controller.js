export default class myProjectsComponent{
    /*@ngInject*/
     constructor(fireBase, supportService) {
        this.userId = supportService.getCookie('user');
        this.myProjects = fireBase.getMyProjects(this.userId);
        this._fireBase = fireBase;
    }
}

