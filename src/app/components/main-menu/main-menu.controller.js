export default class MainMenuComponent{
    /*@ngInject*/
     constructor(fireBase, firebaseAuthService, supportService, $state) {
        this.userId = supportService.getUserId();
        this._firebaseAuthService = firebaseAuthService;
        this._supportService = supportService;
        this._fireBase = fireBase;
        this.user = fireBase.getUser(this.userId);
        this._$state = $state;
        this.showMenu = false;
    }

    createProject() {
        this._$state.go('projects');
    }

    goToProfile() {
        this._$state.go('profile');
        this.showMenu = false;
    }

    toShowMenu() {
        this.showMenu = !this.showMenu;
    }
    toHideMenu() {
        this.showMenu = false;
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

            self.showMenu = false;
        });
    }
}