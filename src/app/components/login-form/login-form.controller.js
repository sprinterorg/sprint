export default class loginFormController {
    /*@ngInject*/
    constructor() {
        //help me to inject dependencies here!
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

/*
app.controller('loginFormController', ['$scope', 'firebaseAuthService', function ($scope, firebaseAuthService) {
    $scope.state = {
        mode: "logIn"
    };
    $scope.user = firebaseAuthService.user;
    $scope.changeModeToLogIn = function () {
        $scope.state.mode = "logIn";
    };
    $scope.changeModeToSignUp = function () {
        $scope.state.mode = "signUp";
    };
    $scope.toLogIn = firebaseAuthService.toLogIn;
    $scope.toSignUp = firebaseAuthService.toSignUp;
}]);
 */