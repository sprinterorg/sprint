export default class loginFormController {
    /*@ngInject*/
    constructor(firebaseAuthService, fireBase, supportService, $state) {
        this._firebaseAuthService = firebaseAuthService;
        this._fireBase = fireBase;
        this._supportService = supportService;
        this.state = {
            mode: "logIn"
        };
        this.entryEmail = "";
        this.entryPassword = "";
        this.entryRepeatPassword = "";
        this._$state = $state;
    }

    changeModeToLogIn() {
        this.state.mode = "logIn";
    };

    changeModeToSignUp() {
        this.state.mode = "signUp";
    };

    SignUp() {
        console.log("SignUp");
        let self = this;
        if(this.entryPassword === this.entryRepeatPassword ){
            this._firebaseAuthService.toSignUp({email: this.entryEmail, password: this.entryPassword}).then( response => {
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


    /*createUser(){
        let self = this;
        this._fireBase.createUser({
            username: this.username,
            email: this.email
        }).then( rootRef => {
            let id = rootRef.key;
            self._supportService.setUser(id);
            self.username = '';
            self.email = '';
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
    }*/


    LogIn() {
        let self = this;
        console.log("LogIn");
        this._firebaseAuthService.toLogIn({email: this.entryEmail, password: this.entryPassword}).then( response => {
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
        });

        
    }


    /*login() {
        this._supportService.setUser(this.userId);
        this._$state.go('profile', {
                preventResolve: {
                value: false,
                squash: true
            }}, {
                location: true,
                notify: false,
                reload: false
            });
    }*/

    clickHanler() {
        this.state.mode === 'logIn' ? this.LogIn() : this.state.mode === 'signUp' ? this.SignUp() : console.error('Wrong state.mode !');
    }

    showButtonName() {
        return this.state.mode === 'logIn' ? 'Log in' : this.state.mode === 'signUp' ? 'Sign Up' : 'Wrong state.mode !';
    }
}