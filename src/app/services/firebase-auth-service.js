import firebase from 'firebase/app';

class firebaseAuthService {
    /*@ngInject*/
    constructor(fireBase) {
        this._fireBase = fireBase;
    }

    signUp(user) {
       return firebase.auth().createUserWithEmailAndPassword(user.email, user.password);
    }

    logIn(user) {
        return firebase.auth().signInWithEmailAndPassword(user.email, user.password);
    }

    logOut() {
        return firebase.auth().signOut();
    }

    verifyAccount(){
        var user = firebase.auth().currentUser;
        user.sendEmailVerification().then(function() {
            console.log("verification e-mail send");
        }).catch(function(error) {
            console.log("varification e-mail sending error");
        });
    }

    sendPasswordResetByEmail(){
        var auth = firebase.auth();
        var emailAddress = firebase.auth().currentUser.email;
        auth.sendPasswordResetEmail(emailAddress).then(function() {
            console.log("password reset e-mail send");
        }).catch(function(error) {
            console.log("password reset e-mail sending error!");
        });
    }

    deleteUser(){
        var user = firebase.auth().currentUser;
        user.delete().then(function() {
            console.log("user successfully deleted");
        }).catch(function(error) {
            console.log("user deleting error");
        });
    }

    reAuthUser(){
        var user = firebase.auth().currentUser;
        var credential;

        // Prompt the user to re-provide their sign-in credentials

        user.reauthenticateWithCredential(credential).then(function() {
            console.log("user reauthentificated successfully");
        }).catch(function(error) {
            console.log("user reauthentificatind error");
        });
    }
}

export default firebaseAuthService;