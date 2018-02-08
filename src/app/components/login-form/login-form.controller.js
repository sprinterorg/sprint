export default class loginFormController {
    /*@ngInject*/
    constructor(firebaseAuthService) {
        this._firebaseAuthService = firebaseAuthService;
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
        this._firebaseAuthService.toSignUp({email: this.entryEmail, password: this.entryPassword});
        this.hideFunc ? this.hideFunc() : '';
    }

    LogIn() {
        console.log("LogIn");
        this._firebaseAuthService.toLogIn({email: this.entryEmail, password: this.entryPassword});
        this.hideFunc ? this.hideFunc() : '';
    }
}