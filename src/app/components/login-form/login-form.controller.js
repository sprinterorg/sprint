export default class loginFormController {
    /*@ngInject*/
    constructor(firebaseAuthService, fireBase, supportService, $state, $rootScope) {
        this._firebaseAuthService = firebaseAuthService;
        this._fireBase = fireBase;
        this._supportService = supportService;
        this._$state = $state;
        this._$rootScope = $rootScope;

        this.entryEmail = '';
        this.entryPassword = '';
        this.entryRepeatPassword = '';

        this.entryEmailLabel = 'e-mail';
        this.entryPasswordLabel = 'password';
        this.entryRepeatPasswordLabel = 'repeat password';

        this.entryEmailValid = true;
        this.entryPasswordValid = true;
        this.entryRepeatPasswordValid = true;

        this.FormIsValid = false;

        this.serverResponseError = "";
    }

    validateEmail(email) {
      var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }

    validatePassword(password){
        if(password.length >= 6){
            return true;
        }
        else{
            return false;
        }
    }

    checkPasswordsMatching(password1, password2){
        if(password1 === password2){
            return true;
        }
        else{
            return false;
        }
    }

    changeModeToLogIn() {
        this.mode = 'logIn';
        this.entryRepeatPassword = '';
        this.entryRepeatPasswordValid = true;
    }

    changeModeToSignUp() {
        this.mode = 'signUp';
        this.entryRepeatPassword = '';
        this.entryRepeatPasswordValid = true;
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
        this._firebaseAuthService.logIn({email: this.entryEmail, password: this.entryPassword}).then( response => {
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
        }, error => {
            self.serverResponseError = error.message;
            self._$rootScope.$apply();
        }); 
    }
    clickHanler() {
        if(this.FormIsValid){
            if(this.mode === 'signUp'){
            this.signUp();
            }
            else{
                this.logIn();
            }
        }
        else{
            this.formValidation();
        }
        
    }

    formValidation(){
        if(this.mode === 'signUp'){
            if(!this.validateEmail(this.entryEmail)){
                this.entryEmailValid = false;
                this.entryEmailLabel = 'invalid e-mail adress';
                this.FormIsValid = false;
                return false;
            }
            else{
                this.entryEmailValid = true;
                this.entryEmailLabel = 'e-mail';
            }

            if(!this.validatePassword(this.entryPassword)){
                this.entryPasswordValid = false;
                this.entryPasswordLabel = 'weak password';
                this.FormIsValid = false;
                return false;
            }
            else{
                this.entryPasswordValid = true;
                this.entryPasswordLabel = 'password';
            }

            if(!this.checkPasswordsMatching(this.entryPassword, this.entryRepeatPassword)){
                this.entryRepeatPasswordValid = false;
                this.entryRepeatPasswordLabel = "passwords don't match";
                this.FormIsValid = false;
                return false;
            }
            else{
                this.entryRepeatPasswordValid = true;
                this.entryRepeatPasswordLabel = 'repeat password';
            }
            this.FormIsValid = true;
            return true;
        }
        else{
            if(!this.validateEmail(this.entryEmail)){
                this.entryEmailValid = false;
                this.entryEmailLabel = 'invalid e-mail adress';
                this.FormIsValid = false;
                return false;
            }
            else{
                this.entryEmailValid = true;
                this.entryEmailLabel = 'e-mail';
            }

            if(!this.validatePassword(this.entryPassword)){
                this.entryPasswordValid = false;
                this.entryPasswordLabel = 'weak password';
                this.FormIsValid = false;
                return false;
            }
            else{
                this.entryPasswordValid = true;
                this.entryPasswordLabel = 'password';
            }
            this.FormIsValid= true;
            return true;
        }
    }

    showButtonName() {
        return this.mode === 'signUp' ? 'Sign Up' : 'Log In';
    }
}