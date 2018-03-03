import './profile.component.scss';


export default class profileController {
    /*@ngInject*/
    constructor(fireBase, supportService, $scope, $rootScope, spinnerService) {
        this.userId = supportService.getUserId();
        this._fireBase = fireBase;
        this.user = fireBase.getUser(this.userId);
        this.projects = fireBase.getProjects();
        this.visible = true;
        this.scope = $scope;
        this._$rootScope = $rootScope;
        this._spinner = spinnerService;
        this._supportService = supportService;
    }

    emit(){
        this.scope.$emit('createProjectEvent');
    }

    updateUser() {
        console.log("updateUser");
        let ids = [];
        if (this.user['my-projects']) ids = Object.keys(this.user['my-projects']);
        this._fireBase.updateUser(ids, this.userId, {
            username: this.user.username,
            email: this.user.email,
            avatar: this.user.avatar
        });
        this.changeUserInformation();
        this.visibleSave = false;
    }

    cancelUpdateUser(){
        this.user = this._fireBase.getUser(this.userId);
        this.visible = !this.visible;
        this.visibleSave = false;
    }

    changeUserInformation() {
        this.visible = !this.visible;
    }

    uploadAvatar(file) {
        console.log("uploadAvatar");
        let self = this;
        self._spinner.activate();
        if (file) {
            let exp = /\/(jpg|jpeg|tiff|png)$/i;
            let correctFile = exp.test(file.type);
            if (correctFile) {
                this._fireBase.uploadAvatar(file)
                    .then(avatar => {
                        self.user.avatar = avatar;
                        self.scope.$apply();
                    }, ()=>{console.log("error")});
            } else {
                console.log('file format incorrect');
            }
        }
        self._supportService.checkLoadApp();
    }
}