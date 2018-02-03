export default class profileController {
    /*@ngInject*/
    constructor(fireBase, supportService, $stateParams) {
        this.userId = supportService.getCookie('user');
        this._fireBase = fireBase;
        this.user = fireBase.getUser(this.userId);
    }

    updateProfile(){
        let self = this;
        this._fireBase.updateUser(this.userId, {
        	username: this.user.username,
        	password: this.user.password,
        	email: this.user.email,
        	avatar: this.user.avatar
        })
    }
}

