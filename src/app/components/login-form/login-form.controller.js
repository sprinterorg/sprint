export default class loginFormController {
     /*@ngInject*/
    constructor(firebaseAuthService) {
        this.state = {
            mode: "logIn"
        };
        this.user = firebaseAuthService.user;
        this.toLogIn = firebaseAuthService.toLogIn;
        this.toSignUp = firebaseAuthService.toSignUp;
    }

    changeModeToLogIn() {
        this.state.mode = "logIn";
    };

    changeModeToSignUp() {
        this.state.mode = "signUp";
    };
}