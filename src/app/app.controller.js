export default class appController {
    /*@ngInject*/
    constructor($location, firebaseAuthService, supportService, $rootScope, $state) {
        this._supportService = supportService;
        this._location = $location;
        this._firebaseAuthService = firebaseAuthService;
        this.showModalWindow = false;
        this.hide = this.toHideModalWindow.bind(this);
        this._$rootScope = $rootScope;
        this._$state = $state;
       
    }

    toSignOut() {
    	let self = this;
    	this._supportService.setUser('');
        this._firebaseAuthService.toSignOut().then( () => {
        	self._$state.go('landing', {
                preventResolve: {
                value: false,
                squash: true
            }}, {
                location: true,
                notify: false,
                reload: false
            });
        });
 
    }

    toShowModalWindow() {
        this.showModalWindow = true;
    }

    toHideModalWindow(booleanReload) {
    	console.log(booleanReload);
        this.showModalWindow = false;
        if(booleanReload)
        	this._$rootScope.$apply();
    }
}