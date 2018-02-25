export default class loginFormController {
    /*@ngInject*/
    constructor(firebaseAuthService, fireBase, supportService, spinnerService, $state, $rootScope) {
        this._firebaseAuthService = firebaseAuthService;
        this._fireBase = fireBase;
        this._supportService = supportService;
        this._$state = $state;
        this._$rootScope = $rootScope;
        this._$state = $state;
        this._spinner = spinnerService;

        this.entryEmail = '';
        this.entryPassword = '';
        this.entryRepeatPassword = '';

        this.entryEmailLabel = 'e-mail';
        this.entryPasswordLabel = 'password';
        this.entryRepeatPasswordLabel = 'repeat password';

        this.regularForEmail=/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        this.entryEmailValid = true;
        this.entryPasswordValid = true;
        this.entryRepeatPasswordValid = true;

        this.FormIsValid = false;
      
        this.serverResponseError = "";
    }

    validateEmail() {
        if(this.regularForEmail.test(this.entryEmail)){
            this.entryEmailValid = true;
            this.entryEmailLabel = 'e-mail';
            return true;
        }
        else{
            this.entryEmailValid = false;
            this.entryEmailLabel = 'invalid e-mail adress';
            return false;
        }
    }

    validatePassword(){
        if(this.entryPassword === undefined){
            this.entryPasswordValid = false;
            this.entryPasswordLabel = 'weak password';
            return false;
        }
        if(this.entryPassword.length >= 6){
            this.entryPasswordValid = true;
            this.entryPasswordLabel = 'password';
            return true;
        }
        else{
            this.entryPasswordValid = false;
            this.entryPasswordLabel = 'weak password';
            return false;
        }
    }

    checkPasswordsMatching(){
        if(this.entryPassword === this.entryRepeatPassword){
            this.entryRepeatPasswordValid = true;
            this.entryRepeatPasswordLabel = 'repeat password';
            return true;
        }
        else{
            this.entryRepeatPasswordValid = false;
            this.entryRepeatPasswordLabel = "passwords don't match";
            return false;
        }
    }

    formValidation(){
        if(this.mode === 'logIn'){
            this.FormIsValid = this.validateEmail() && this.validatePassword();
            return this.FormIsValid;
        }
        if(this.mode === 'signUp'){
            this.FormIsValid = this.validateEmail() && this.validatePassword() && this.checkPasswordsMatching();
            return this.FormIsValid;
        }
    }

    changeModeToLogIn() {
        this.mode = 'logIn';
        this.entryPassword = '';
        this.entryPasswordValid = true;
        this.FormIsValid = false;
        this.serverResponseError = "";
        this.entryPasswordLabel = 'password';
        this.entryRepeatPasswordLabel = 'repeat password';
    }

    changeModeToSignUp() {
        this.mode = 'signUp';
        this.entryPassword = '';
        this.entryRepeatPassword = '';
        this.entryPasswordValid = true;
        this.entryRepeatPasswordValid = true;
        this.FormIsValid = false;
        this.serverResponseError = "";
        this.entryPasswordLabel = 'password';
        this.entryRepeatPasswordLabel = 'repeat password';
    }

    signUp() {
        let self = this;
        this._firebaseAuthService.signUp({email: this.entryEmail, password: this.entryPassword}).then( response => {
            self.serverResponseError = "";
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
        }, error => {
            self.serverResponseError = error.message;
            self._$rootScope.$apply();
        });
    }

    logIn() {
        let self = this;
        self._spinner.activate();
        this._firebaseAuthService.logIn({email: this.entryEmail, password: this.entryPassword}).then(response => {
			self.serverResponseError = "";
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
        }, error => {
            self.serverResponseError = error.message;
            self._$rootScope.$apply();
        }); 
    }

    clickHanler() {
        if(this.formValidation()){
            if(this.mode === 'logIn'){
                this.logIn();
            }
            if(this.mode === 'signUp'){
                this.signUp();
            }
        }
        else{
            return;
        }
        
    }

    showButtonName() {
        return this.mode === 'signUp' ? 'Sign Up' : 'Log In';
    }
}