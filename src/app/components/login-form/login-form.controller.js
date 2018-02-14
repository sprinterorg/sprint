export default class loginFormController {
    /*@ngInject*/
    constructor(firebaseAuthService, fireBase, supportService, spinnerService, $state) {
        this._firebaseAuthService = firebaseAuthService;
        this._fireBase = fireBase;
        this._supportService = supportService;
        this.entryEmail = '';
        this.entryPassword = '';
        this.entryRepeatPassword = '';
        this._$state = $state;
        this._spinner = spinnerService;

    }

    changeModeToLogIn() {
        this.mode = 'logIn';
    }

    changeModeToSignUp() {
        this.mode = 'signUp';
    }

    signUp() {
        let self = this;
        if(this.entryPassword === this.entryRepeatPassword ){
            this._firebaseAuthService.signUp({email: this.entryEmail, password: this.entryPassword}).then( response => {
               self._supportService.setUser(response.uid);
               self.hideFunc(true);
               self._fireBase.createUser(response.uid, {
                    username: self.entryEmail.substr(0, self.entryEmail.indexOf('@')),
                    email: self.entryEmail
                }).then( rootRef => {
                    self._$state.go('profile', {
                        preventResolve: {
                        value: false,
                        squash: true
                    }}, {
                        location: true,
                        notify: false,
                        reload: false
                    });

                });
            });
        }
    }

    logIn() {
        let self = this;
        self._spinner.activate();
        this._firebaseAuthService.logIn({email: this.entryEmail, password: this.entryPassword}).then(response => {
            self._supportService.setUser(response.uid);
            self.hideFunc(true);
            self._$state.go('profile', {
                preventResolve: {
                value: false,
                squash: true
            }}, {
                location: true,
                notify: false,
                reload: false
            });
            self._supportService.checkLoadApp(response.uid);
        });

    }

    clickHanler() {
        this.mode === 'signUp' ? this.signUp() : this.logIn();
    }

    showButtonName() {
        return this.mode === 'signUp' ? 'Sign Up' : 'Log In';
    }
}