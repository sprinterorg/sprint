import firebase from 'firebase/app';

/*@ngInject*/
class firebaseAuthService {
    constructor() {
        this.user = {
            email: "",
            password: "",
            repeated_password: "",
            message: "",
            firebase_response: ""
        }
    };

    toSignUp(user) {
        const self = this;
        self.user.message = '';
        if (self.user.password === self.user.repeated_password) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password).then(
                function (response) {
                    console.log('New user ' + response.email + ' has been created' + ' with ' + response.uid + ' id');
                    self.user.firebase_response = response;
                },
                function (error) {
                    let errorMessage = error.message;
                    self.user.message = errorMessage;
                    console.error(errorMessage);
                });
        }
        else {
            self.user.message = "Passwords don't match!";
        }
    };

    toLogIn(user) {
        const self = this;
        self.user.message = '';
        firebase.auth().signInWithEmailAndPassword(user.email, user.password).then(
            function (response) {
                console.log('You are logged in as ' + response.email + ' with ' + response.uid + ' id');
                console.log(firebase.auth().currentUser);
                self.user.firebase_response = response;
            },
            function (error) {
                //let errorCode = error.code;
                let errorMessage = error.message;
                self.user.message = errorMessage;
                console.error(errorMessage);
            });
    };

    toSignOut() {
        const self = this;
        firebase.auth().signOut().then(
            function () {
                console.log('Sign out successfull.');
                self.user = {
                    email: "",
                    password: "",
                    repeated_password: "",
                    message: "",
                    firebase_response: ""
                };
            }).catch(
            function (error) {
                let errorMessage = error.message;
                self.user.message = errorMessage;
                console.error(errorMessage);
            }
        );
    };
}

export default firebaseAuthService;

/*
app.factory('firebaseAuthService', function () {
    return {
        user: {
            email: "",
            password: "",
            repeated_password: "",
            message: "",
            firebase_response:""
        },
        toSignUp: function (user) {
            const self = this;
            self.user.message='';
            if (this.user.password === this.user.repeated_password) {
                firebase.auth().createUserWithEmailAndPassword(user.email, user.password).then(
                    function (response) {
                        console.log('New user ' + response.email + ' has been created' + ' with ' + response.uid + ' id');
                        self.user.firebase_response = response;
                    },
                    function (error) {
                        console.error(error.message);
                        self.user.message = error.message;
                    });
            }
            else {
                this.user.message = "Passwords don't match!";
            }
        },
        toLogIn: function (user) {
            const self = this;
            self.user.message = '';
            firebase.auth().signInWithEmailAndPassword(user.email, user.password).then(
                function (response) {
                    console.log('You are logged in as ' + response.email + ' with ' + response.uid + ' id');
                    console.log(firebase.auth().currentUser);
                    self.user.firebase_response= response;
                },
                function (error) {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    console.error(error.message);
                    self.user.message = errorMessage;
                });
        },
        toSignOut: function () {
            const self = this;
            firebase.auth().signOut().then(
                function () {
                    console.log('Sign out successfull.');
                    self.user = {
                        email: "",
                        password: "",
                        repeated_password: "",
                        message: "",
                        firebase_response:""
                    };
                }).catch(
                function (error) {
                    console.error(error.message);
                    self.user.message = error.message;
                }
            );
        }
    };
});

 */