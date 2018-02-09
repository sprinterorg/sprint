import firebase from 'firebase/app';

class firebaseAuthService {
    /*@ngInject*/
    constructor(fireBase, supportService) {
        this._fireBase = fireBase;
        this._supportService = supportService;
        this.user = {};
        this.error = {
            errorCode: "",
            errorMessage: ""
        };
    };

    toSignUp(user) {
        const self = this;
        self.error = {
            errorCode: "",
            errorMessage: ""
        };
        firebase.auth().createUserWithEmailAndPassword(user.email, user.password).then(
            function (response) {
                console.log('Log in is successful!');
                self.user = response;
                console.log(self.user);
                self.error = {
                    errorCode: "",
                    errorMessage: ""
                };
            },
            function (error) {
                self.error = {
                    errorCode: error.code,
                    errorMessage: error.message
                };
                console.error(self.error.errorMessage);
            }
        );
    };

    toLogIn(user) {
        const self = this;
        self.error = {
            errorCode: "",
            errorMessage: ""
        };
        firebase.auth().signInWithEmailAndPassword(user.email, user.password).then(
            function (response) {
                console.log('Log in is successful!');
                self.user = response;
                console.log(self.user);
                self.error = {
                    errorCode: "",
                    errorMessage: ""
                };
            },
            function (error) {
                self.error = {
                    errorCode: error.code,
                    errorMessage: error.message
                };
                console.error(self.error.errorMessage);
            }
        );
    };

    toSignOut() {
        const self = this;
        firebase.auth().signOut().then(
            function () {
                console.log('Sign out is successful!');
                console.log(response);
                self.user = {};
                self.error = {
                    errorCode: "",
                    errorMessage: ""
                };
            }).catch(
            function (error) {
                self.error = {
                    errorCode: error.code,
                    errorMessage: error.message
                };
                console.error(self.error.errorMessage);
            }
        );
    };
}

export default firebaseAuthService;