export default class appController {
    /*@ngInject*/
    constructor($location, firebaseAuthService, supportService, $rootScope) {
        this._supportService = supportService;
        this._location = $location;
        this._firebaseAuthService = firebaseAuthService;
        this.showModalWindow = false;
        this.hide = this.toHideModalWindow.bind(this);
        this.rootScope = $rootScope;
       
    }

    toSignOut() {
    	let self = this;
    	this._supportService.setUser('');
    	this._location.path('/');
        this._firebaseAuthService.toSignOut().then( () => {
        });
 
    }

    toShowModalWindow() {
        this.showModalWindow = true;
    }

    toHideModalWindow(booleanReload) {
    	console.log(booleanReload);
        this.showModalWindow = false;
        if(booleanReload)
        	this.rootScope.$apply();
    }

    sendToLogin() {
        this._location.path('/');
        this.toShowModalWindow();
    }

    toChangeRoute(path) {
        if (this._supportService.getCookie('user')) {
            this._location.path(path);
        }
        else {
            this.sendToLogin();
        }
    }
}