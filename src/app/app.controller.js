export default class appController {
    /*@ngInject*/
    constructor($location,  supportService, $rootScope, $state) {
        this._supportService = supportService;
        this._location = $location;
        this.showModalWindow = false;
        this.showSearch = false;
        this.hide = this.toHideModalWindow.bind(this);
        this.hideSearch = this.toHideSearch.bind(this);
        this._$rootScope = $rootScope;
        this._$state = $state;
        this.mode = 'logIn';


        if(!supportService.userId) {
            this._$state.go('landing');
        }
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

    toHideSearch() {
        this.showSearch = false;
    }
}