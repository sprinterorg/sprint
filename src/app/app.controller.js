export default class appController {
    /*@ngInject*/
    constructor($location, supportService, $scope, $rootScope, $state, spinnerService, fireBase) {
        this._supportService = supportService;
        this._fireBase = fireBase;
        this._spinnerService = spinnerService;
        this._location = $location;
        this.showModalWindow = false;
        this.showSearch = false;
        this.hide = this.toHideModalWindow.bind(this);
        this.hideSearch = this.toHideSearch.bind(this);
        this.showProjects = this.toShowModalWindow.bind(this);
        this._$rootScope = $rootScope;
        this._scope = $scope;
        this._$state = $state;
        this.mode = 'logIn';
        this.isLoaded = false;

        this.showProjectDeleteComfirmation = false;
        this.showCloseSprintConfirmation = false;

        this._$rootScope.$on('hideApp', () => {
            this.isLoaded = false;
        });
        $scope.$on('showProjectDeleteConfirmation', (event, bool)=>{
            this.toShowProjectDeleteComfirmation(bool);
        });
        this._$rootScope.$on('showCloseSprintConfirmation', (event, bool)=>{
            this.toShowCloseSprintConfirmition(bool);
        });
        this._scope.$on('createProjectEvent', (event, data)=>{
            this.toShowModalWindow("projects");
        });

        if (!supportService.userId) {
            this._$state.go('landing');
            spinnerService.deactivate();
            this.isLoaded = true;
            this._$rootScope.$on('appLoaded', () => {
                this.isLoaded = true;
            });
        } else {
            this._supportService.checkLoadApp();
            this._$rootScope.$on('appLoaded', () => {
                this.isLoaded = true;
            });
        }

        $scope.$on('registrate', (event) => this.toShowModalWindow('signUp'));
    }
    
    toShowModalWindow(mode) {
        this.showModalWindow = true;
        this.mode = mode;
    }

    toHideModalWindow(booleanReload) {
        this._spinnerService.deactivate();
        this.showModalWindow = false;
        if(booleanReload){
        	this._$rootScope.$apply();
        }
    }

    toShowSearch() {
        this.showSearch = !this.showSearch;
    }
    toHideSearch() {
        this.showSearch = false;
    }
    toShowProjectDeleteComfirmation(a){
        this.showProjectDeleteComfirmation = a;
    }
    toShowCloseSprintConfirmition(a){
        this.showCloseSprintConfirmation = a;
    }

    onProjectDeleteConfirm(){
        this._$rootScope.$broadcast('confirmProjectDelete');
    }

    onSprintCloseConfirm(){
        this._$rootScope.$broadcast('confirmSprintClose');
    }
}
