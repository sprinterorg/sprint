export default class windowProfileController{
    /*@ngInject*/
    constructor() {
        this.user = this.userInfo;
        this.top = this.userTop;
        this.isShow = this.userIsShow;
    }
    dblclick(){
        this.userIsShow = !this.userIsShow;
    }
}