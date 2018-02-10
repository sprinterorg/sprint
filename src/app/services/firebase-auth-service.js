import firebase from 'firebase/app';

class firebaseAuthService {
    /*@ngInject*/
    constructor(fireBase) {
        this._fireBase = fireBase;
        /*this._supportService = supportService;*/
        /*this.user = {};
        this.error = {
            errorCode: "",
            errorMessage: ""
        };*/
    }

    toSignUp(user) {
        /*const self = this;
        self.error = {
            errorCode: "",
            errorMessage: ""
        };*/
       return firebase.auth().createUserWithEmailAndPassword(user.email, user.password);
        /*.then(
            function (response) {
                console.log('Log in is successful!');
                self.user = response;
                console.log(self.user);
                self.error = {
                    errorCode: "",
                    errorMessage: ""
                };
                self._supportService.setUser(self.user.uid);
            },
            function (error) {
                self.error = {
                    errorCode: error.code,
                    errorMessage: error.message
                };
                console.error(self.error.errorMessage);
            }
        );*/
    }

    toLogIn(user) {
       /* const self = this;
        self.error = {
            errorCode: "",
            errorMessage: ""
        };*/
        return firebase.auth().signInWithEmailAndPassword(user.email, user.password);/*.then(
            function (response) {
                console.log('Log in is successful!');
                self.user = response;
                console.log(self.user);
                self.error = {
                    errorCode: "",
                    errorMessage: ""
                };
                self._supportService.setUser(self.user.uid);
            },
            function (error) {
                self.error = {
                    errorCode: error.code,
                    errorMessage: error.message
                };
                console.error(self.error.errorMessage);
            }
        );*/
    }

    toSignOut() {
        /*const self = this;
        self._supportService.setUser("");*/
        return firebase.auth().signOut();/*.then(
            function () {
                console.log('Sign out is successful!');
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
        );*/
    }
}

export default firebaseAuthService;