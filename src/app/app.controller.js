export default class appController {
    /*@ngInject*/
    constructor($location, firebaseAuthService, supportService, $rootScope, $state) {
        this._supportService = supportService;
        this._location = $location;
        this._firebaseAuthService = firebaseAuthService;
        this.showModalWindow = false;
        this.showSearch = false;
        this.hide = this.toHideModalWindow.bind(this);
        this._$rootScope = $rootScope;
        this._$state = $state;
        this.mode = 'logIn';


        if(!supportService.userId) {
            this._$state.go('landing');
        }
    }

    logOut() {
    	let self = this;
    	this._supportService.setUser('');
        this._firebaseAuthService.logOut().then(() => {
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

    toShowModalWindow(mode) {
        this.showModalWindow = true;
        this.mode = mode;
    }

    toHideModalWindow(booleanReload) {
        this.showModalWindow = false;
        if(booleanReload)
        	this._$rootScope.$apply();
    }

    toShowSearch() {
        this.showSearch = !this.showSearch;
    }
}