export default class appController {
    /*@ngInject*/
    constructor($location, firebaseAuthService, supportService) {
        this._supportService = supportService;
        this._location = $location;
        this._firebaseAuthService = firebaseAuthService;
        this.showModalWindow = false;
        this.hide = this.toHideModalWindow.bind(this);
       
    }

    toSignOut() {
    	let self = this;
    	this._supportService.setUser('');
        this._firebaseAuthService.toSignOut().then( () => {
        });
 
    }

    toShowModalWindow() {
        this.showModalWindow = true;
    }

    toHideModalWindow() {
    	console.log('2')
        this.showModalWindow = false;
        console.log(this.showModalWindow)
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