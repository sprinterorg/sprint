export default class loginFormController {
    /*@ngInject*/
    constructor(firebaseAuthService, supportService) {
        this._firebaseAuthService = firebaseAuthService;
        this._supportService = supportService;
        this.state = {
            mode: "logIn"
        };
        this.entryEmail = "";
        this.entryPassword = "";
        this.entryRepeatPassword = "";
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
                
            });
            
        }
        /*else{
            this._firebaseAuthService.error = {
                errorCode: "pwdsDstnMtch",
                errorMessage: "Passwords don't match! Please, try again."
            };
        }*/
    }

    LogIn() {
        let self = this;
        console.log("LogIn");
        this._firebaseAuthService.toLogIn({email: this.entryEmail, password: this.entryPassword}).then( response => {
            console.log('loged in');
            self._supportService.setUser(response.uid);
            console.log(self._supportService.userId)
            console.log('1')
            self.hideFunc();
            console.log('3')
        });

        
    }

    clickHanler() {
        this.state.mode === 'logIn' ? this.LogIn() : this.state.mode === 'signUp' ? this.SignUp() : console.error('Wrong state.mode !');
    }

    showButtonName() {
        return this.state.mode === 'logIn' ? 'Log in' : this.state.mode === 'signUp' ? 'Sign Up' : 'Wrong state.mode !';
    }
}