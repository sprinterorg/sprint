import './profile.component.scss';

export default class profileController {
    /*@ngInject*/
    constructor(fireBase, supportService, $stateParams) {
        this.userId = supportService.getUserId();
        this._fireBase = fireBase;
        this.user = fireBase.getUser(this.userId);
        this.projects = fireBase.getProjects();
        this.visible = true;
        this.srcAvatar = supportService.getPicture('spiderman');
        console.log("constructor = " + this.srcAvatar);
    }

    updateUser() {
        let ids = Object.keys(this.user['my-projects']);
        let self = this;
        console.log("updateUser" + this)
        this._fireBase.updateUser(ids, this.userId, {
        	username: this.user.username,
        	email: this.user.email,
        	avatar: this.user.avatar
        });
    }

    changeUserInfirmation(){
        this.visible = !this.visible;
        console.log(this.visible);
        console.log("changeAvatar");
    }
}

