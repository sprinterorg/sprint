export default class profileController {
    /*@ngInject*/
    constructor(fireBase, supportService, $stateParams) {
        this.userId = supportService.getCookie('user');
        this._fireBase = fireBase;
        this.user = fireBase.getUser(this.userId);
    }

    updateUser() {
        let ids = Object.keys(this.user['my-projects']);
        let self = this;
        this._fireBase.updateUser(ids, this.userId, {
        	username: this.user.username,
        	email: this.user.email,
        	avatar: this.user.avatar
        });
    }
}

