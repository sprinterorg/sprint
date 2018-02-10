export default class appController {
    /*@ngInject*/
    constructor($location, firebaseAuthService, supportService) {
        this._supportService = supportService;
        this._location = $location;
        this._firebaseAuthService = firebaseAuthService;
        this.showModalWindow = false;
        this.userId=supportService.getCookie('user');
    }

    toSignOut() {
        this._firebaseAuthService.toSignOut();
        this.userId="";
    }

    toShowModalWindow() {
        this.showModalWindow = true;
    }

    toHideModalWindow() {
        this.showModalWindow = false;
    }

    sendToLogin() {
        this._location.path("/");
        this.toShowModalWindow();
    }

    toChangeRoute(path) {
        if (this._supportService.getCookie("user")) {
            this._location.path(path);
        }
        else {
            this.sendToLogin();
        }
    }
}