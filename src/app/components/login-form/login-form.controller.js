export default class loginFormController {
    /*@ngInject*/
    constructor(firebaseAuthService, supportService) {
        this._firebaseAuthService = firebaseAuthService;
        this._supportService=supportService;
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
        if(this.entryPassword === this.entryRepeatPassword ){
            this._firebaseAuthService.toSignUp({email: this.entryEmail, password: this.entryPassword});
            this.hideFunc ? this.hideFunc() : '';
        }
        else{
            this._firebaseAuthService.error = {
                errorCode: "pwdsDstnMtch",
                errorMessage: "Passwords don't match! Please, try again."
            };
        }
    }

    LogIn() {
        console.log("LogIn");
        this._firebaseAuthService.toLogIn({email: this.entryEmail, password: this.entryPassword});
        this.hideFunc ? this.hideFunc() : '';
    }
}