export default class appController {
    /*@ngInject*/
    constructor($location, firebaseAuthService) {
        this.showModalWindow = false;
        this._location = $location;
        this._firebaseAuthService = firebaseAuthService;
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
        if (this._firebaseAuthService.user.uid) {
            this._location.path(path);
        }
        else {
            this.sendToLogin();
        }
    }
}