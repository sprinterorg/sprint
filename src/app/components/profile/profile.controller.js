import './profile.component.scss';


export default class profileController {
    /*@ngInject*/
    constructor(fireBase, supportService, $scope) {
        this.userId = supportService.getUserId();
        this._fireBase = fireBase;
        this.user = fireBase.getUser(this.userId);
        this.projects = fireBase.getProjects();
        this.visible = true;
        this.scope = $scope;
    }

    updateUser() {
        let ids = Object.keys(this.user['my-projects']);
        this._fireBase.updateUser(ids, this.userId, {
            username: this.user.username,
            email: this.user.email,
            avatar: this.user.avatar
        });
        this.changeUserInfirmation();
    }

    changeUserInfirmation() {
        this.visible = !this.visible;
    }

    uploadAvatar(file) {
        if (file) {
            let exp = /\/(jpg|jpeg|tiff|png)$/i;
            let correctFile = exp.test(file.type);
            if (correctFile) {
                this._fireBase.uploadAvatar(file)
                    .then(avatar => {
                        this.user.avatar = avatar;
                        this.scope.$apply();
                    });
            } else {
                console.log('file format incorrect');
            }
        }
    }

}

