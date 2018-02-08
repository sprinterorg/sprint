import './profile.component.scss';

export default class profileController {
    /*@ngInject*/
    constructor(fireBase, supportService, $stateParams) {
        this.userId = supportService.getCookie('user');
        this._fireBase = fireBase;
        this.user = fireBase.getUser(this.userId);
        this.projects = fireBase.getProjects();
        this.visible = true;
        this.srcAvatar = supportService.getPicture('spiderman');
        console.log("constructor = " + this.srcAvatar);
    }

    updateUser() {
        let ids = [];
        this.projects.filter( item => Object.keys(item['users']).filter(item => item === this.userId).length>0).map(item => ids.push(item.$id));
        let self = this;
        console.log("updateUser" + this)
        this._fireBase.updateUser(ids, this.userId, {
        	username: this.user.username,
        	email: this.user.email,
        	avatar: this.user.avatar
        })
    }

    changeUserInfirmation(){
        this.visible = !this.visible;
        console.log(this.visible);
        console.log("changeAvatar");
    }
}

