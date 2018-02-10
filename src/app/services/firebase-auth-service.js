import firebase from 'firebase/app';

class firebaseAuthService {
    /*@ngInject*/
    constructor(fireBase) {
        this._fireBase = fireBase;
    }

    toSignUp(user) {
       return firebase.auth().createUserWithEmailAndPassword(user.email, user.password);
    }

    toLogIn(user) {
        return firebase.auth().signInWithEmailAndPassword(user.email, user.password);
    }

    toSignOut() {
        return firebase.auth().signOut();
            
    }
}

export default firebaseAuthService;